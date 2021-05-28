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
  altres_dades: string;
  created_at?: Date
}
