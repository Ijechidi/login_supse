// types.ts
export enum Role {
    PATIENT = 'PATIENT',
    MEDECIN = 'MEDECIN',
    ADMIN = 'ADMIN',
    SECRETAIRE = 'SECRETAIRE'
  }
  
  export enum Statut {
    en_attente = 'en_attente',
    confirme = 'confirme',
    annule = 'annule',
    termine = 'termine'
  }
  
  export interface User {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    avatarUrl?: string;
    telephone: string;
    dateNaissance: Date;
    adresse: string;
    age?: number;
    role: Role;
    meta?: any;
    createdAt: Date;
  }
  
  export interface TypeRendezVous {
    id: string;
    nom: string;
    code: string;
    couleur?: string;
    description?: string;
    createdAt: Date;
  }
  
  export interface Medecin {
    id: string;
    userId: string;
    specialite: string;
    description?: string;
    indisponibilites?: any;
    meta?: any;
    user: User;
  }
  
  export interface Patient {
    id: string;
    userId: string;
    meta?: any;
    user: User;
  }
  
  export interface RendezVous {
    id: string;
    patientId: string;
    medecinId: string;
    typeId: string;
    dateDebut: Date;
    dateFin?: Date;
    motif: string;
    statut: Statut;
    historique?: any;
    meta?: any;
    createdAt: Date;
    type: TypeRendezVous;
    patient: Patient;
    medecin: Medecin;
  }
  
  export interface PatientRendezVousProps {
    patientId: string;
    rendezVous?: RendezVous[];
    onViewDetails?: (rendezVousId: string) => void;
    onCancel?: (rendezVousId: string) => void;
  }