
export enum Role {
    PATIENT = 'PATIENT',
    MEDECIN = 'MEDECIN',
    ADMIN = 'ADMIN',
    SECRETAIRE = 'SECRETAIRE'
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