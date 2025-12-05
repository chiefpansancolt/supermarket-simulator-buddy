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
  storeLevel?: number;
  activeLoans?: ActiveLoan[];
  unlockedLicenses?: string[];
  unlockedGrowth?: string[];
  unlockedStorage?: string[];
  hiredEmployees?: string[];
  unlockedTools?: string[];
  unlockedVehicles?: string[];
  // Future: Add progress tracking fields here
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}
