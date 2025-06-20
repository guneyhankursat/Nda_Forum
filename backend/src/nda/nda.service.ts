import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { BaseClauseChecker, ClauseCheckResult } from './clauses/base-clause-checker';
import { ConfidentialityClauseChecker } from './clauses/confidentiality-clause-checker';
import { TermClauseChecker } from './clauses/term-clause-checker';
import { JurisdictionClauseChecker } from './clauses/jurisdiction-clause-checker';
import { RemediesClauseChecker } from './clauses/remedies-clause-checker';
import { ExclusionsClauseChecker } from './clauses/exclusions-clause-checker';
import { SignaturesClauseChecker } from './clauses/signatures-clause-checker';

@Injectable()
export class NdaService {
  private checkers: BaseClauseChecker[] = [
    new ConfidentialityClauseChecker(),
    new TermClauseChecker(),
    new JurisdictionClauseChecker(),
    new RemediesClauseChecker(),
    new ExclusionsClauseChecker(),
    new SignaturesClauseChecker(),
    // Additional clause checkers can be added here
  ];

  // Pattern matching for clause detection
  checkAllClauses(text: string): Record<string, ClauseCheckResult> {
    const results: Record<string, ClauseCheckResult> = {};
    for (const checker of this.checkers) {
      results[checker.key] = checker.check(text);
    }
    return results;
  }

  // OpenAI integration for advanced clause analysis
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'your-openai-api-key') {
      this.openai = new OpenAI({ apiKey });
    }
  }

  // Helper function to clean up snippets by removing line numbers and indices
  private cleanSnippet(snippet: string): string {
    if (!snippet || typeof snippet !== 'string') return snippet || '';
    
    // Remove patterns like "0:", "1:", "2:", etc. at the beginning of lines
    return snippet.replace(/^\d+:\s*/gm, '').trim();
  }

  // Helper function to clean up AI response
  private cleanAIResponse(response: any): any {
    if (!response || typeof response !== 'object') return response;
    
    const cleaned = { ...response };
    for (const [key, value] of Object.entries(cleaned)) {
      if (value && typeof value === 'object' && 'snippet' in value && typeof value.snippet === 'string') {
        cleaned[key] = {
          ...value,
          snippet: this.cleanSnippet(value.snippet)
        };
      }
    }
    return cleaned;
  }

  async checkAllClausesWithAI(text: string): Promise<any> {
    // Use pattern matching when OpenAI isn't available
    if (!this.openai) {
      console.log('OpenAI not configured, falling back to basic clause checks');
      return {
        message: 'AI analysis not available (OpenAI API key not configured)',
        fallback: this.checkAllClauses(text)
      };
    }

    try {
      const prompt = `
Analyze the following NDA and state if these clauses are present: confidentiality, term, jurisdiction, remedies, exclusions, signatures.
For each clause, respond with PRESENT or ABSENT, and extract a relevant snippet if present, formatted as JSON with this schema:
{
  "confidentiality": { "present": "PRESENT or ABSENT", "snippet": "..." },
  "term": { "present": "PRESENT or ABSENT", "snippet": "..." },
  "jurisdiction": { "present": "PRESENT or ABSENT", "snippet": "..." },
  "remedies": { "present": "PRESENT or ABSENT", "snippet": "..." },
  "exclusions": { "present": "PRESENT or ABSENT", "snippet": "..." },
  "signatures": { "present": "PRESENT or ABSENT", "snippet": "..." }
}

NDA TEXT:
${text}
`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      });

      const content = completion.choices[0].message.content;

      try {
        // Parse JSON response from OpenAI
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedResponse = JSON.parse(jsonMatch[0]);
          return this.cleanAIResponse(parsedResponse);
        }
        // Return raw content if JSON parsing fails
        return { raw: content };
      } catch (e) {
        return { error: 'AI response could not be parsed as JSON', raw: content };
      }
    } catch (error) {
      // Log the error for troubleshooting
      console.error('OpenAI API error:', error);
      // Use pattern matching as backup
      return {
        error: 'AI analysis failed, using basic checks instead',
        fallback: this.checkAllClauses(text)
      };
    }
  }
}