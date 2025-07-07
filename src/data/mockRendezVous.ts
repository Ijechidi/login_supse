import { addDays, setHours, setMinutes } from "date-fns";

type RendezVous = {
  id: string;
  dateDebut: Date;
  dateFin?: Date;
  motif: string;
  statut: 'en_attente' | 'confirme' | 'annule' | 'termine';
  type: {
    nom: string;
    couleur?: string;
  };
  medecin: {
    user: {
      nom: string;
      prenom: string;
    };
  };
};

// Fonction utilitaire pour créer une date avec heure spécifique
const createDateTime = (daysToAdd: number, hours: number, minutes: number = 0) => {
  const date = addDays(new Date(), daysToAdd);
  return setMinutes(setHours(date, hours), minutes);
};

export const mockRendezVous: RendezVous[] = [
  {
    id: "1",
    dateDebut: createDateTime(1, 9, 30), // Demain 9h30
    dateFin: createDateTime(1, 10, 0),   // Demain 10h00
    motif: "Consultation générale",
    statut: "confirme",
    type: {
      nom: "Consultation",
      couleur: "#4CAF50"
    },
    medecin: {
      user: {
        nom: "Dupont",
        prenom: "Jean"
      }
    }
  },
  {
    id: "2",
    dateDebut: createDateTime(1, 14, 0), // Demain 14h00
    dateFin: createDateTime(1, 14, 30),  // Demain 14h30
    motif: "Suivi traitement",
    statut: "en_attente",
    type: {
      nom: "Suivi",
      couleur: "#2196F3"
    },
    medecin: {
      user: {
        nom: "Martin",
        prenom: "Sophie"
      }
    }
  },
  {
    id: "3",
    dateDebut: createDateTime(3, 11, 0), // Dans 3 jours 11h00
    dateFin: createDateTime(3, 11, 45),  // Dans 3 jours 11h45
    motif: "Contrôle annuel",
    statut: "confirme",
    type: {
      nom: "Contrôle",
      couleur: "#9C27B0"
    },
    medecin: {
      user: {
        nom: "Dubois",
        prenom: "Marie"
      }
    }
  },

  {
    id: "4",
    dateDebut: createDateTime(5, 16, 30), // Dans 5 jours 16h30
    dateFin: createDateTime(5, 17, 0),    // Dans 5 jours 17h00
    motif: "Urgence dentaire",
    statut: "confirme",
    type: {
      nom: "Urgence",
      couleur: "#F44336"
    },
    medecin: {
      user: {
        nom: "Bernard",
        prenom: "Pierre"
      }
    }
  },
  {
    id: "5",
    dateDebut: createDateTime(3, 15, 0), // Dans 3 jours 15h00
    dateFin: createDateTime(3, 15, 30),  // Dans 3 jours 15h30
    motif: "Consultation de suivi",
    statut: "en_attente",
    type: {
      nom: "Suivi",
      couleur: "#2196F3"
    },
    medecin: {
      user: {
        nom: "Martin",
        prenom: "Sophie"
      }
    }
  },
  {
    id: "6",
    dateDebut: createDateTime(1, 14, 35), // Demain 14h35
    dateFin: createDateTime(1, 15, 30),  // Demain 15h30
    motif: "Suivi traitement",
    statut: "en_attente",
    type: {
      nom: "Suivi",
      couleur: "#2196F3"
    },
    medecin: {
      user: {
        nom: "Martin",
        prenom: "Sophie"
      }
    }
  },

]  