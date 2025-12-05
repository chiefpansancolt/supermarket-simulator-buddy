export interface ActiveLoan {
  loanIndex: number;
  termLength: number;
  activatedDate: string;
}

export interface Playthrough {
  id: string;
  name: string;
  createdAt: string;
  lastModified: string;
  description?: string;
  activeLoans?: ActiveLoan[];
  // Future: Add progress tracking fields here
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}
