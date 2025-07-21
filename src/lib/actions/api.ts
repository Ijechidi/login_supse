"use server"
import { Statut, TypeRendezVousEnum } from "@prisma/client";
import { prisma } from "../prisma";

export async function updateRendezVous(id: string, data: Partial<{ type: TypeRendezVousEnum; dateDebut: Date; dateFin?: Date; motif: string; statut: Statut; historique: any; meta: any }>) {
    try {
      return await prisma.rendezVous.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rendez-vous:', error);
      throw new Error('Impossible de mettre à jour le rendez-vous');
    }
  }