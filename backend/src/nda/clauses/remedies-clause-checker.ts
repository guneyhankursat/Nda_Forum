import { BaseClauseChecker, ClauseCheckResult } from './base-clause-checker';

export class RemediesClauseChecker extends BaseClauseChecker {
  key = 'remedies';
  displayName = 'Remedies';
  description = 'Specifies remedies in case of breach.';

  check(text: string): ClauseCheckResult {
    const regex = /\b(remedy|remedies|injunctive\s+relief|damages|legal\s+action)\b/i;
    const match = regex.exec(text);
    return {
      present: !!match,
      snippet: match ? match[0] : undefined,
      explanation: match
        ? "Remedies clause detected."
        : "No remedies clause detected.",
    };
  }
}