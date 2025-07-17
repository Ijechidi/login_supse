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

// Enum strictement conforme au schéma Prisma
export enum TypeRendezVousEnum {
  CONSULTATION = "CONSULTATION",
  SUIVI = "SUIVI",
  URGENCE = "URGENCE",
  TELECONSULTATION = "TELECONSULTATION"
}

export type RendezVous = {
  id: string;
  patientId: string;
  medecinId: string;
  dateDebut: Date;
  dateFin?: Date;
  motif: string;
  statut: "en_attente" | "confirme" | "annule" | "termine";
  type: TypeRendezVousEnum;
  historique?: any;
  meta?: any;
  createdAt: Date;
};


