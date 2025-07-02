# Contexte du schéma Prisma

Ce fichier résume la structure de la base de données décrite dans `prisma/schema.prisma` pour l'application.

## Modèles principaux

### User
- id: String (UUID, clé primaire)
- email: String (unique)
- nom: String
- prenom: String
- avatarUrl: String? (optionnel)
- telephone: String
- dateNaissance: DateTime
- adresse: String
- role: Role (enum, PATIENT par défaut)
- meta: Json? (optionnel)
- createdAt: DateTime (auto, map "created_at")
- patient: Patient? (relation)
- medecin: Medecin? (relation)

### Patient
- id: String (UUID, clé primaire)
- userId: String (unique, relation User)
- meta: Json? (optionnel)
- rendezVous: RendezVous[]

### Medecin
- id: String (UUID, clé primaire)
- userId: String (unique, relation User)
- specialite: String
- description: String? (optionnel)
- indisponibilites: Json? (optionnel)
- meta: Json? (optionnel)
- rendezVous: RendezVous[]
- disponibilites: Disponibilite[]

### Disponibilite
- id: String (UUID, clé primaire)
- medecinId: String (relation Medecin)
- jour: String
- heureDebut: DateTime
- heureFin: DateTime
- meta: Json? (optionnel)

### RendezVous
- id: String (UUID, clé primaire)
- patientId: String (relation Patient)
- medecinId: String (relation Medecin)
- date: DateTime
- heure: DateTime
- motif: String
- statut: Statut (enum, en_attente par défaut)
- historique: Json? (optionnel)
- meta: Json? (optionnel)
- createdAt: DateTime (auto, map "created_at")

## Enums

### Role
- PATIENT
- MEDECIN
- ADMIN
- SECRETAIRE

### Statut
- en_attente
- confirme
- annule
- termine

## Relations principales
- Un `User` peut être lié à un `Patient` ou un `Medecin` (jamais les deux en même temps).
- Un `Patient` a plusieurs `RendezVous`.
- Un `Medecin` a plusieurs `RendezVous` et plusieurs `Disponibilites`.
- Un `RendezVous` relie un `Patient` et un `Medecin`.

---

Ce contexte doit être utilisé pour comprendre la structure des données et les relations dans l'application. 