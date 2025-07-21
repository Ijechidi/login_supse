# Rapport de Projet Tutoré

## 1. Introduction

Ce rapport présente le développement d'une application web de gestion médicale, réalisée dans le cadre d'un projet tutoré. L'objectif principal est de faciliter la prise de rendez-vous entre patients et médecins, la gestion des disponibilités, et l'administration des profils utilisateurs, tout en assurant une expérience utilisateur moderne et sécurisée.

## 2. Présentation du contexte et des objectifs

Dans un contexte où la digitalisation des services de santé devient essentielle, cette application vise à offrir une plateforme centralisée permettant aux patients de prendre rendez-vous avec des médecins selon leurs disponibilités, de gérer leur profil, et d'accéder à diverses fonctionnalités liées au suivi médical. Les médecins peuvent, quant à eux, gérer leurs créneaux de disponibilité, consulter la liste de leurs patients et organiser leur emploi du temps.

## 3. Analyse des besoins

Les besoins identifiés sont les suivants :
- Authentification sécurisée des utilisateurs (patients et médecins)
- Gestion des profils utilisateurs (complétion, modification, avatar)
- Prise de rendez-vous avec gestion des disponibilités
- Visualisation des rendez-vous passés et à venir
- Gestion des spécialités médicales
- Interface utilisateur intuitive et responsive

## 4. Conception de l’application

### 4.1 Architecture générale
L’application est structurée autour du framework Next.js pour le front-end et l’API, avec une base de données gérée via Prisma. L’authentification s’appuie sur Supabase. L’architecture suit une séparation claire entre les composants UI, la logique métier (hooks, actions), et l’accès aux données.

### 4.2 Modélisation de la base de données
La base de données est modélisée dans `prisma/schema.prisma` et gérée via des migrations. Les principales entités sont :
- Utilisateur (Patient, Médecin)
- Rendez-vous
- Disponibilité
- Spécialité médicale

#### Extrait du schéma Prisma :
```prisma
model User {
  id             String    @id @default(uuid())
  email          String    @unique
  nom            String
  prenom         String
  avatarUrl      String?
  telephone      String
  dateNaissance  DateTime
  adresse        String
  age            Int?
  role           Role      @default(PATIENT)
  meta           Json?
  createdAt      DateTime  @default(now()) @map("created_at")
  patient        Patient?
  medecin        Medecin?
}

model RendezVous {
  id              String               @id @default(uuid())
  patientId       String               @map("patient_id")
  medecinId       String               @map("medecin_id")
  disponibiliteId String               @unique @map("disponibilite_id")
  type            TypeRendezVousEnum
  motif           String
  dateDebut       DateTime
  dateFin         DateTime?
  statut          Statut               @default(EN_ATTENTE)
  historique      Json?
  meta            Json?
  createdAt       DateTime             @default(now()) @map("created_at")
  patient         Patient              @relation(fields: [patientId], references: [id])
  medecin         Medecin              @relation(fields: [medecinId], references: [id])
  disponibilite   Disponibilite        @relation(fields: [disponibiliteId], references: [id])
}
```

### 4.3 Choix techniques
- **Front-end** : Next.js, React, TailwindCSS
- **Back-end/API** : Next.js API routes, Prisma ORM
- **Authentification** : Supabase
- **Gestion d’état** : React Query, stores personnalisés (Zustand)
- **UI** : Composants réutilisables, design responsive

## 5. Réalisation

### 5.1 Fonctionnalités principales
- **Authentification** : Inscription, connexion, réinitialisation et mise à jour du mot de passe, confirmation par email
- **Gestion des profils** : Complétion du profil, upload d’avatar, affichage des informations utilisateur
- **Gestion des rendez-vous** : Prise de rendez-vous, visualisation, annulation, gestion des statuts
- **Gestion des disponibilités** : Ajout, modification, suppression de créneaux par les médecins
- **Gestion des spécialités** : Filtrage et affichage des médecins par spécialité

#### Exemple de flux de prise de rendez-vous :
1. Le patient consulte la liste des médecins disponibles (`/rendez-vous/nouveau`).
2. Il sélectionne un médecin, puis un créneau disponible.
3. Il confirme le rendez-vous, qui est alors créé côté serveur (API `/api/rendez-vous/patient`).
4. Le rendez-vous apparaît dans la liste de ses rendez-vous (`/rendez-vous`).

#### Exemple de gestion du profil utilisateur :
- Lors de la première connexion, l’utilisateur complète son profil via un formulaire (nom, prénom, téléphone, date de naissance, adresse, avatar, spécialité pour les médecins).
- Les données sont enregistrées à la fois dans la base Prisma et dans les métadonnées Supabase pour la cohérence et la sécurité.
- L’utilisateur peut modifier son profil à tout moment.

### 5.2 Organisation du code
- `src/app/` : Pages et routes principales (patients, médecins, rendez-vous, authentification)
- `src/components/` : Composants UI (auth, calendrier, patient, médecin, rendez-vous, etc.)
- `src/hooks/` : Hooks personnalisés pour la gestion des données et de l’état
- `src/lib/` : Actions, accès base de données, utilitaires
- `prisma/` : Schéma et migrations de la base de données

### 5.3 Exemples de flux utilisateur
- Un patient s’inscrit, complète son profil, consulte la liste des médecins par spécialité, prend rendez-vous selon les disponibilités affichées, et visualise ses rendez-vous à venir.
- Un médecin se connecte, gère ses créneaux de disponibilité, consulte la liste de ses patients et les rendez-vous planifiés.

## 6. Sécurité et gestion des rôles

- **Authentification** : Gérée par Supabase, avec stockage sécurisé des mots de passe et gestion des sessions.
- **Rôles** : Chaque utilisateur possède un rôle (`PATIENT`, `MEDECIN`, `ADMIN`, `SECRETAIRE`) stocké dans la base et dans les métadonnées Supabase. Les accès aux routes et fonctionnalités sont filtrés selon le rôle.
- **Règles RLS** : Des politiques Row Level Security (RLS) sont appliquées sur les buckets de stockage (avatars) pour garantir que chaque utilisateur ne peut modifier que ses propres données.
- **Middleware** : Un middleware Next.js vérifie la session utilisateur à chaque requête et redirige vers la page de connexion si besoin.

## 7. Résultats obtenus

L’application permet une gestion fluide des rendez-vous médicaux, une administration simple des profils, et une expérience utilisateur moderne. Les tests réalisés montrent une bonne robustesse des principales fonctionnalités.

## 8. Difficultés rencontrées et solutions apportées

- **Synchronisation des disponibilités et rendez-vous** : Gestion des conflits de créneaux, résolue par des vérifications côté back-end et une UX adaptée.
- **Sécurité de l’authentification** : Utilisation de Supabase pour garantir la sécurité des données utilisateurs.
- **Responsive design** : Adaptation de l’interface pour tous types d’écrans grâce à TailwindCSS.
- **Gestion des rôles** : Mise en place d’un système robuste pour filtrer les accès et garantir la confidentialité des données.

## 9. Perspectives d’évolution

- Ajout de notifications (email/SMS) pour les rappels de rendez-vous
- Intégration d’un module de téléconsultation
- Statistiques et tableaux de bord pour les médecins
- Amélioration de l’accessibilité
- Ajout d’un historique détaillé des actions utilisateurs

## 10. Conclusion

Ce projet a permis de mettre en œuvre une application complète répondant à des besoins concrets du secteur médical. Les choix techniques et l’organisation du code facilitent la maintenance et l’évolution future de la plateforme. Le travail collaboratif et l’approche modulaire ont été des atouts majeurs pour la réussite du projet.
