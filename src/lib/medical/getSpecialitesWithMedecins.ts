'use server';
import { prisma } from "@/lib/prisma";
import { Specialite } from "@prisma/client";

export async function getSpecialitesWithMedecins() {
  // Récupérer dynamiquement les valeurs de l'enum Specialite
  const enumSpecialites = Object.values(Specialite);

  // Récupérer tous les médecins avec leur user
  const medecins = await prisma.medecin.findMany({
    include: {
      user: true,
    },
  });

  // Regrouper les médecins par spécialité
  const specialitesMap: Record<string, { nom: string; medecins: any[] }> = {};
  enumSpecialites.forEach((spec) => {
    specialitesMap[spec] = {
      nom: spec,
      medecins: [],
    };
  });

  medecins.forEach((medecin) => {
    if (specialitesMap[medecin.specialite]) {
      specialitesMap[medecin.specialite].medecins.push({
        id: medecin.id,
        nom: medecin.user.nom,
        prenom: medecin.user.prenom,
        avatarUrl: medecin.user.avatarUrl,
        specialite: medecin.specialite,
        telephone: medecin.user.telephone,
        isDisponible: true, // TODO: à calculer selon la logique métier
      });
    }
  });

  return Object.values(specialitesMap);
} 