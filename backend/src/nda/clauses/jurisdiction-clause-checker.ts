import { BaseClauseChecker, ClauseCheckResult } from './base-clause-checker';

export class JurisdictionClauseChecker extends BaseClauseChecker {
  key = 'jurisdiction';
  displayName = 'Jurisdiction';
  description = 'Specifies the governing law or venue.';

  check(text: string): ClauseCheckResult {
    const regex = /\b(jurisdiction|govern(ed|ing)\s+law|venue|court)\b/i;
    const match = regex.exec(text);
    return {
      present: !!match,
      snippet: match ? match[0] : undefined,
      explanation: match
        ? "Jurisdiction/governing law clause detected."
        : "No jurisdiction/governing law clause detected.",
    };
  }
}