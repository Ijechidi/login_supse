import { Patient, Statut, TypeRendezVousEnum } from "@prisma/client";


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


export type RendezVous = {
  id: string;
  patientId: string;
  medecinId: string;

  type: TypeRendezVousEnum;
  dateDebut: Date;
  dateFin?: Date | null;
  motif: string;
  statut: Statut;
  historique?: Record<string, any> | null;
  meta?: Record<string, any> | null;
  createdAt: Date;

  patient?: Patient; // optionnel si tu charges la relation
  medecin?: Medecin;
};


export type DisponibiliteAvecRendezVous = Disponibilite & {
  rendezVous: RendezVous[];
};

const disponibilitesAvecRendezVous: DisponibiliteAvecRendezVous[] = [
  {
    id: "abc",
    medecinId: "xyz",
    heureDebut: new Date(),
    heureFin: new Date(),
    status: "LIBRE",
    rendezVous: [
      {
        id: "rdv1",
        patientId: "pat1",
        medecinId: "xyz",
        type: "CONSULTATION",
        dateDebut: new Date(),
        motif: "Douleur",
        statut: "en_attente",
        createdAt: new Date(),
      },
    ],
  },
];
