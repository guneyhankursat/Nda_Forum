import { BaseClauseChecker, ClauseCheckResult } from './base-clause-checker';

export class ConfidentialityClauseChecker extends BaseClauseChecker {
  key = 'confidentiality';
  displayName = 'Confidentiality';
  description = 'Restricts disclosure of information.';

  check(text: string): ClauseCheckResult {
    const regex = /\bconfidential(it(y|ies)?| information|ity)\b/i;
    const match = regex.exec(text);
    return {
      present: !!match,
      snippet: match ? match[0] : undefined,
      explanation: match
        ? "Confidentiality clause detected."
        : "No confidentiality clause detected.",
    };
  }
}