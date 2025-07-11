import type { RendezVousType } from "@/types/rendezVous"

export const mockAppointments: RendezVousType[] = [
  // Rendez-vous pour le 3 juillet 2025
  {
    id: "1",
    patientId: "patient1",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 3, 9, 0),
    dateFin: new Date(2025, 6, 3, 10, 0),
    motif: "Consultation générale",
    statut: "confirme",
    createdAt: new Date(),
    meta: {
      patientName: "Marie Dubois",
      phone: "06 12 34 56 78",
      typeRendezVous: "1",
      notes: "Première consultation, douleurs abdominales",
      location: "Cabinet médical - Salle 1",
    },
  },
  {
    id: "2",
    patientId: "patient2",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 3, 14, 0),
    dateFin: new Date(2025, 6, 3, 15, 0),
    motif: "Suivi médical",
    statut: "en_attente",
    createdAt: new Date(),
    meta: {
      patientName: "Jean Martin",
      phone: "06 98 76 54 32",
      typeRendezVous: "2",
      notes: "Contrôle tension artérielle",
    },
  },
  // Rendez-vous pour le 5 juillet 2025
  {
    id: "3",
    patientId: "patient3",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 5, 10, 0),
    dateFin: new Date(2025, 6, 5, 11, 0),
    motif: "Contrôle de routine",
    statut: "confirme",
    createdAt: new Date(),
    meta: {
      patientName: "Sophie Laurent",
      phone: "06 45 67 89 12",
      typeRendezVous: "1",
      location: "Cabinet médical - Salle 2",
    },
  },
  {
    id: "4",
    patientId: "patient4",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 5, 15, 0),
    dateFin: new Date(2025, 6, 5, 16, 0),
    motif: "Consultation spécialisée",
    statut: "termine",
    createdAt: new Date(),
    meta: {
      patientName: "Pierre Durand",
      phone: "06 23 45 67 89",
      typeRendezVous: "3",
      notes: "Consultation terminée avec succès",
      location: "Cabinet médical - Salle 1",
    },
  },
  {
    id: "5",
    patientId: "patient5",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 5, 16, 0),
    dateFin: new Date(2025, 6, 5, 17, 0),
    motif: "Urgence mineure",
    statut: "annule",
    createdAt: new Date(),
    meta: {
      patientName: "Claire Moreau",
      phone: "06 78 90 12 34",
      typeRendezVous: "3",
      notes: "Annulé par le patient - report demandé",
    },
  },
  // Rendez-vous pour le 8 juillet 2025
  {
    id: "6",
    patientId: "patient6",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 8, 9, 0),
    dateFin: new Date(2025, 6, 8, 10, 0),
    motif: "Bilan de santé",
    statut: "confirme",
    createdAt: new Date(),
    meta: {
      patientName: "Antoine Rousseau",
      phone: "06 56 78 90 12",
      typeRendezVous: "1",
      location: "Cabinet médical - Salle 1",
    },
  },
  {
    id: "7",
    patientId: "patient7",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 8, 11, 0),
    dateFin: new Date(2025, 6, 8, 12, 0),
    motif: "Suivi post-opératoire",
    statut: "confirme",
    createdAt: new Date(),
    meta: {
      patientName: "Isabelle Bernard",
      phone: "06 34 56 78 90",
      typeRendezVous: "2",
      notes: "Contrôle cicatrisation",
      location: "Cabinet médical - Salle 2",
    },
  },
  // Rendez-vous pour le 10 juillet 2025
  {
    id: "8",
    patientId: "patient8",
    medecinId: "medecin-123",
    dateDebut: new Date(2025, 6, 10, 14, 0),
    dateFin: new Date(2025, 6, 10, 15, 0),
    motif: "Consultation pédiatrique",
    statut: "confirme",
    createdAt: new Date(),
    meta: {
      patientName: "Lucas Petit",
      phone: "06 12 90 78 56",
      typeRendezVous: "1",
      notes: "Vaccination de rappel",
      location: "Cabinet médical - Salle pédiatrie",
    },
  },
]
