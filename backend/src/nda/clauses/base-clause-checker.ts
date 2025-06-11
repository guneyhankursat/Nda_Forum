export interface ClauseCheckResult {
    present: boolean;
    snippet?: string;
    explanation?: string;
  }
  
  export abstract class BaseClauseChecker {
    abstract key: string;
    abstract displayName: string;
    abstract description: string;
    abstract check(text: string): ClauseCheckResult;
  }