"use server";
import { prisma } from "@/lib/prisma";
import { TypeRendezVousEnum } from "@/types/rendezVous";
import { Statut } from "@/types/types";

export async function getRendezVousByMedecin(medecinId: string, date?: string) {
  return prisma.rendezVous.findMany({
    where: {
      medecinId,
      ...(date && {
        dateDebut: {
          gte: new Date(date + "T00:00:00"),
          lt: new Date(date + "T23:59:59"),
        },
      }),
    },
    include: {
      patient: true,
      medecin: true,
      
    },
    orderBy: { dateDebut: "asc" },
  });
}

export async function createRendezVous(data: {
  patientId: string;
  medecinId: string;
  dateDebut: Date;
  dateFin?: Date;
  motif: string;
  statut?: Statut;
  type: TypeRendezVousEnum;
  meta?: any;
}) {
  return prisma.rendezVous.create({
    data,
  });
}

export async function cancelRendezVous(id: string) {
  return prisma.rendezVous.update({
    where: { id },
    data: { statut: "annule" },
  });
} 