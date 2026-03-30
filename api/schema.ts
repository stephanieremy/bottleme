export interface Bottle {
  id: string;
  appellation: string;
  vintage: number;
  type: string;
  creationDate: Date;
  region?: string;
  quantity?: number;
  price?: number;
  score?: number;
  notes?: string;
}
