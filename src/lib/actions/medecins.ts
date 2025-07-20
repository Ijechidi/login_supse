"use server";
import { prisma } from "@/lib/prisma";
import { Medecin } from "@/components/ux/ProfileCard";

export async function getAllMedecins(): Promise<Medecin[]> {
  const medecins = await prisma.medecin.findMany({
    include: {
      user: true,
    },
  });
  return medecins.map((m) => ({
    id: m.id,
    nom: m.user.nom,
    prenom: m.user.prenom,
    avatarUrl: m.user.avatarUrl,
    specialite: m.specialite,
    telephone: m.user.telephone,
    isDisponible: true, // À adapter selon la logique métier réelle
  }));
} 