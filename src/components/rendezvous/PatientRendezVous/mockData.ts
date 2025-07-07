// mockData.ts
import { RendezVous, Statut, Role } from './types';

export const mockRendezVous: RendezVous[] = [
  {
    id: "1",
    patientId: "patient-1",
    medecinId: "medecin-1",
    typeId: "type-1",
    dateDebut: new Date("2024-12-15T10:00:00"),
    dateFin: new Date("2024-12-15T10:30:00"),
    motif: "Consultation de routine",
    statut: Statut.confirme,
    createdAt: new Date("2024-12-01T09:00:00"),
    type: {
      id: "type-1",
      nom: "Consultation",
      code: "consultation",
      couleur: "#00b894",
      description: "Consultation médicale générale",
      createdAt: new Date("2024-01-01T00:00:00")
    },
    medecin: {
      id: "medecin-1",
      userId: "user-medecin-1",
      specialite: "Médecine générale",
      user: {
        id: "user-medecin-1",
        email: "dr.martin@example.com",
        nom: "Martin",
        prenom: "Dr. Jean",
        telephone: "0123456789",
        dateNaissance: new Date("1980-01-01"),
        adresse: "123 Rue de la Santé",
        role: Role.MEDECIN,
        createdAt: new Date("2024-01-01T00:00:00")
      }
    },
    patient: {
      id: "patient-1",
      userId: "user-patient-1",
      user: {
        id: "user-patient-1",
        email: "patient@example.com",
        nom: "Dupont",
        prenom: "Marie",
        telephone: "0987654321",
        dateNaissance: new Date("1990-01-01"),
        adresse: "456 Rue des Patients",
        role: Role.PATIENT,
        createdAt: new Date("2024-01-01T00:00:00")
      }
    }
  },
  {
    id: "2",
    patientId: "patient-1",
    medecinId: "medecin-2",
    typeId: "type-2",
    dateDebut: new Date("2024-12-20T14:00:00"),
    dateFin: new Date("2024-12-20T14:45:00"),
    motif: "Contrôle post-opératoire",
    statut: Statut.en_attente,
    createdAt: new Date("2024-12-05T14:30:00"),
    type: {
      id: "type-2",
      nom: "Suivi",
      code: "suivi",
      couleur: "#fdcb6e",
      description: "Rendez-vous de suivi",
      createdAt: new Date("2024-01-01T00:00:00")
    },
    medecin: {
      id: "medecin-2",
      userId: "user-medecin-2",
      specialite: "Chirurgie",
      user: {
        id: "user-medecin-2",
        email: "dr.dubois@example.com",
        nom: "Dubois",
        prenom: "Dr. Marie",
        telephone: "0123456788",
        dateNaissance: new Date("1975-01-01"),
        adresse: "789 Rue des Chirurgiens",
        role: Role.MEDECIN,
        createdAt: new Date("2024-01-01T00:00:00")
      }
    },
    patient: {
      id: "patient-1",
      userId: "user-patient-1",
      user: {
        id: "user-patient-1",
        email: "patient@example.com",
        nom: "Dupont",
        prenom: "Marie",
        telephone: "0987654321",
        dateNaissance: new Date("1990-01-01"),
        adresse: "456 Rue des Patients",
        role: Role.PATIENT,
        createdAt: new Date("2024-01-01T00:00:00")
      }
    }
  },
  {
    id: "3",
    patientId: "patient-1",
    medecinId: "medecin-1",
    typeId: "type-1",
    dateDebut: new Date("2024-11-30T09:30:00"),
    dateFin: new Date("2024-11-30T10:00:00"),
    motif: "Bilan de santé annuel",
    statut: Statut.termine,
    createdAt: new Date("2024-11-15T10:00:00"),
    type: {
      id: "type-1",
      nom: "Consultation",
      code: "consultation",
      couleur: "#00b894",
      description: "Consultation médicale générale",
      createdAt: new Date("2024-01-01T00:00:00")
    },
    medecin: {
      id: "medecin-1",
      userId: "user-medecin-1",
      specialite: "Médecine générale",
      user: {
        id: "user-medecin-1",
        email: "dr.martin@example.com",
        nom: "Martin",
        prenom: "Dr. Jean",
        telephone: "0123456789",
        dateNaissance: new Date("1980-01-01"),
        adresse: "123 Rue de la Santé",
        role: Role.MEDECIN,
        createdAt: new Date("2024-01-01T00:00:00")
      }
    },
    patient: {
      id: "patient-1",
      userId: "user-patient-1",
      user: {
        id: "user-patient-1",
        email: "patient@example.com",
        nom: "Dupont",
        prenom: "Marie",
        telephone: "0987654321",
        dateNaissance: new Date("1990-01-01"),
        adresse: "456 Rue des Patients",
        role: Role.PATIENT,
        createdAt: new Date("2024-01-01T00:00:00")
      }
    }
  }
];