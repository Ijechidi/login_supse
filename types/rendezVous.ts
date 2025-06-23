export interface FormData {
  medecinId: string;
  date: string;
  heure: string;
  motif: string;
}

export interface ValidationErrors {
  medecinId?: string;
  date?: string;
  heure?: string;
  motif?: string;
}