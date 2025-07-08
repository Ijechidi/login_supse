import { Role, User } from "@/types/types";

export const userData: User = {
    id: "usr_123456789",
    email: "kofi.asante@email.com",
    nom: "Asante",
    prenom: "Kofi",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    telephone: "22890123456",
    dateNaissance: new Date("1990-03-15"),
    adresse: "123 Rue de la Paix, Lomé, Togo",
    age: 34, // Sera calculé automatiquement
    role: Role.PATIENT,
    meta: {
      preferences: {
        theme: "dark",
        language: "fr",
        notifications: true
      },
      lastLogin: new Date("2025-01-15"),
      profileCompleteness: 85
    },
    createdAt: new Date("2023-06-12")
  };

