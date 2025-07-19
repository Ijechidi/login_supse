import { Patient, RendezVous, Statut, TypeRendezVousEnum } from "@prisma/client";


export type DisponibiliteStatus = "LIBRE" | "RESERVE" | "ANNULE";

export type Disponibilite = {
  id: string;
  medecinId: string;
  heureDebut: Date;
  heureFin: Date;
  status: DisponibiliteStatus;
  meta?: any;
  medecin?: Medecin;
};

export type Medecin = {
  id: string;
  userId: string;
  specialite: string;
  description?: string;
  indisponibilites?: Disponibilite[];
  meta?: Record<string, any> | null;
  user: User;
};


export type User ={
  id: string;
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
  role: string;
  avatarUrl?: string;
}





export type DisponibiliteAvecRendezVous = Disponibilite & {
  rendezVous: RendezVous | null;
};


