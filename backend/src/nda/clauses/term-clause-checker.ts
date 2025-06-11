import { BaseClauseChecker, ClauseCheckResult } from './base-clause-checker';

export class TermClauseChecker extends BaseClauseChecker {
  key = 'term';
  displayName = 'Term';
  description = 'Specifies the duration of the agreement.';

  check(text: string): ClauseCheckResult {
    const regex = /\b(term(\s+of\s+this\s+agreement)?|duration|effective\s+period)\b/i;
    const match = regex.exec(text);
    return {
      present: !!match,
      snippet: match ? match[0] : undefined,
      explanation: match
        ? "Term/duration clause detected."
        : "No term/duration clause detected.",
    };
  }
}