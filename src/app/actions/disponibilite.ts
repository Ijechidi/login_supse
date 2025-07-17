"use server";
import { prisma } from "@/lib/prisma";

export async function getDisponibilitesByMedecin(medecinId: string) {
  return prisma.disponibilite.findMany({
    where: { medecinId },
    orderBy: [{ heureDebut: "asc" }],
  });
}

export async function addDisponibilite({
  medecinId,
  heureDebut,
  heureFin,
  meta,
}: {
  medecinId: string;
  heureDebut: Date;
  heureFin: Date;
  meta?: any;
}) {
  console.log("medecin Id : ", medecinId)
  return prisma.disponibilite.create({
    data: {
      status: "LIBRE",
      medecinId,
      heureDebut,
      heureFin,
      meta,
    },
  });
}

export async function deleteDisponibilite(id: string) {
  return prisma.disponibilite.delete({ where: { id } });
}

export async function updateDisponibilite(id: string, data: Partial<{ jour: string; heureDebut: Date; heureFin: Date; meta: any }>) {
  return prisma.disponibilite.update({
    where: { id },
    data,
  });
} 