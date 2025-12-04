export interface Playthrough {
  id: string;
  name: string;
  createdAt: string;
  lastModified: string;
  description?: string;
  // Future: Add progress tracking fields here
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}
