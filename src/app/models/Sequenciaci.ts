export interface Sequenciacio {
  id: number;
  nom?: string;
  cromossoma: string;
  laboratori: string
  data: string;
  pacient: number;
  comentari: string;
  estat: string;
  fitxerSequencia: File;
}
