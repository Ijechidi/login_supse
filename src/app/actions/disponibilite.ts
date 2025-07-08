"use server";
import { prisma } from "@/lib/prisma";

export async function getDisponibilitesByMedecin(medecinId: string) {
  return prisma.disponibilite.findMany({
    where: { medecinId },
    orderBy: [{ jour: "asc" }, { heureDebut: "asc" }],
  });
}

export async function addDisponibilite({
  medecinId,
  jour,
  heureDebut,
  heureFin,
  meta,
}: {
  medecinId: string;
  jour: string;
  heureDebut: Date;
  heureFin: Date;
  meta?: any;
}) {
  return prisma.disponibilite.create({
    data: {
      medecinId,
      jour,
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