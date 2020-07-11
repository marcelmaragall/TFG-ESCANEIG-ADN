export interface Pacient {
  id: number;
  nom: string;
  dni?: string;
  cognoms: string;
  telefon?: string;
  ce: string;
  pais: string;
  ciutat?: string;
  address?: string;
  usuari: number;
  created_at?: Date
}
