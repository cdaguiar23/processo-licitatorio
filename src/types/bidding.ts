export interface Bidding {
  id: number;
  number: string;
  year: number;
  title: string;
  description: string;
  openingDate: string;
  closingDate: string;
  status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled';
  estimatedValue: number;
  type: 'pregao' | 'tomada_preco' | 'concorrencia' | 'convite';
  documents: string[];
}