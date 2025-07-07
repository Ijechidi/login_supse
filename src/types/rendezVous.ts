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


export type RendezVousType = {
  id: string
  patientId: string
  medecinId: string
  dateDebut: Date
  dateFin?: Date
  motif: string
  statut: "en_attente" | "confirme" | "annule" | "termine"
  historique?: any
  meta?: any
  createdAt: Date
}

export type TypeRendezVous = {
  id: string
  nom: string
  couleur?: string
  description?: string
}
