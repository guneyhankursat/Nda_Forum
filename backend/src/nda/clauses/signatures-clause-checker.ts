import { BaseClauseChecker, ClauseCheckResult } from './base-clause-checker';

export class SignaturesClauseChecker extends BaseClauseChecker {
  key = 'signatures';
  displayName = 'Signatures';
  description = 'Checks for presence of signature section.';

  check(text: string): ClauseCheckResult {
    const regex = /\b(signature|signed\s+by|executed\s+by|date\s+of\s+signature)\b/i;
    const match = regex.exec(text);
    return {
      present: !!match,
      snippet: match ? match[0] : undefined,
      explanation: match
        ? "Signature section detected."
        : "No signature section detected.",
    };
  }
}