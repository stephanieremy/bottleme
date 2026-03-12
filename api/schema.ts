export interface Bottle {
  id: string;
  designation: string;
  vintage: string;
  type: string;
  creationDate: Date;
  region?: string;
  quantity?: number;
  price?: number;
  score?: number;
}
