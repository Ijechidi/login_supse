export type Role = "ADMIN" | "MEDECIN" | "PATIENT" | "SECRETAIRE"

export type Statut = "en_attente" | "confirme" | "annule" | "termine"

export enum Specialite {
  MEDECINE_GENERALE = "MEDECINE_GENERALE",
  CARDIOLOGIE = "CARDIOLOGIE",
  DERMATOLOGIE = "DERMATOLOGIE",
  PEDIATRIE = "PEDIATRIE",
  GYNECOLOGIE = "GYNECOLOGIE",
  NEUROLOGIE = "NEUROLOGIE",
  OPHTALMOLOGIE = "OPHTALMOLOGIE",
  ORTHOPEDIE = "ORTHOPEDIE",
}

export type User = {
  id: string
  nom: string
  prenom: string
  email: string
  avatarUrl?: string
  telephone: string
  dateNaissance: string
  adresse: string
  age?: number
  role: Role
  createdAt: string
}

export type Patient = {
  id: string
  userId: string
  user: Pick<User, "nom" | "prenom" | "email" | "telephone" | "dateNaissance">
  meta?: any
  rendezVous: RendezVous[]
}

export type Medecin = {
  id: string
  userId: string
  specialite: Specialite
  description?: string
  indisponibilites?: any
  disponibilites: Disponibilite[]
  user: Pick<User, "nom" | "prenom" | "email" | "telephone">
}

export type Disponibilite = {
  id: string
  medecinId: string
  jour: string
  heureDebut: string
  heureFin: string
  meta?: any
}

export type TypeRendezVous = {
  id: string
  nom: string
  code: string
  couleur?: string
  description?: string
  createdAt: string
}

export type RendezVous = {
  id: string
  patientId: string
  medecinId: string
  typeId: string
  dateDebut: string
  dateFin?: string
  motif: string
  statut: Statut
  historique?: any
  meta?: any
  createdAt: string
  patient: {
    user: Pick<User, "nom" | "prenom" | "email">
  }
  medecin: {
    user: Pick<User, "nom" | "prenom" | "email">
  }
  type: TypeRendezVous
}

export type DashboardStats = {
  totalUsers: number
  totalPatients: number
  totalMedecins: number
  totalRendezVous: number
  rendezVousParStatut: Record<Statut, number>
  prochainRendezVous: {
    date: string
    patient: string
    medecin: string
    type: string
  } | null
}
