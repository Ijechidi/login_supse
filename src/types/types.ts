export interface DisponibiliteWithRendezVous {
    id: string;
    medecinId: string;
    heureDebut: Date;
    heureFin: Date;
    status: 'LIBRE' | 'RESERVE' | 'ANNULE';
    meta?: any;
    rendezVous?: RendezVousWithPatient;
  }
  
  export interface RendezVousWithPatient {
    id: string;
    patientId: string;
    medecinId: string;
    disponibiliteId: string;
    type: string;
    dateDebut: Date;
    dateFin?: Date;
    motif: string;
    statut: 'EN_ATTENTE' | 'CONFIRME' | 'ANNULE' | 'TERMINE';
    patient: {
      id: string;
      user: {
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
      };
    };
  }
  
  