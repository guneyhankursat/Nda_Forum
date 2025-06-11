import { BaseClauseChecker, ClauseCheckResult } from './base-clause-checker';

export class ExclusionsClauseChecker extends BaseClauseChecker {
  key = 'exclusions';
  displayName = 'Exclusions';
  description = 'Lists information that is excluded from confidentiality.';

  check(text: string): ClauseCheckResult {
    const regex = /\b(exclusions?|except(ed|ion)?|does\s+not\s+apply|not\s+subject\s+to\s+confidentiality)\b/i;
    const match = regex.exec(text);
    return {
      present: !!match,
      snippet: match ? match[0] : undefined,
      explanation: match
        ? "Exclusions clause detected."
        : "No exclusions clause detected.",
    };
  }
}