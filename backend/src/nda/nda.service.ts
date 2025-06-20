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
    // Add other clause checkers here if needed
  ];

  // Basic regex-based clause checks
  checkAllClauses(text: string): Record<string, ClauseCheckResult> {
    const results: Record<string, ClauseCheckResult> = {};
    for (const checker of this.checkers) {
      results[checker.key] = checker.check(text);
    }
    return results;
  }

  // AI-powered clause detection using OpenAI
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'your-openai-api-key') {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async checkAllClausesWithAI(text: string): Promise<any> {
    // If OpenAI is not configured, fall back to basic checks
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
        // Extract JSON block from the AI response
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        // fallback, return raw content
        return { raw: content };
      } catch (e) {
        return { error: 'AI response could not be parsed as JSON', raw: content };
      }
    } catch (error) {
      // Log for debugging
      console.error('OpenAI API error:', error);
      // Return fallback instead of throwing error
      return {
        error: 'AI analysis failed, using basic checks instead',
        fallback: this.checkAllClauses(text)
      };
    }
  }
}