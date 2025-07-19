"use server";
import { prisma } from "@/lib/prisma";
import { DisponibiliteWithRendezVous, RendezVousWithPatient } from "@/types/types";
import { TypeRendezVousEnum, Statut } from "@prisma/client";




//get disponibilité + rendez-vous

export async function getDisponibilitesWithRendezVous(
  medecinId: string, 
  date?: string
): Promise<DisponibiliteWithRendezVous[]> {
  try {
    return await prisma.disponibilite.findMany({
      where: {
        medecinId,
        ...(date && {
          heureDebut: {
            gte: new Date(`${date}T00:00:00`),
            lt: new Date(`${date}T23:59:59`),
          },
        }),
      },
      include: {
        rendezVous: {
          include: {
            patient: {
              include: { user: true },
            },
          },
        },
      },
      orderBy: {
        heureDebut: "asc",
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des disponibilités:', error);
    throw new Error('Impossible de récupérer les disponibilités');
  }
}



//

export async function getRendezVousByMedecin(
  medecinId: string, 
  date?: string
): Promise<RendezVousWithPatient[]> {
  try {
    return await prisma.rendezVous.findMany({
      where: {
        medecinId,
        ...(date && {
          dateDebut: {
            gte: new Date(`${date}T00:00:00`),
            lt: new Date(`${date}T23:59:59`),
          },
        }),
      },
      include: {
        patient: {
          include: { user: true },
        },
      },
      orderBy: {
        dateDebut: "asc",
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    throw new Error('Impossible de récupérer les rendez-vous');
  }
}



export async function getDisponibilitesLibres(
  medecinId: string, 
  date?: string
): Promise<DisponibiliteWithRendezVous[]> {
  try {
    return await prisma.disponibilite.findMany({
      where: {
        medecinId,
        status: 'LIBRE',
        rendezVous: null, // Pas de rendez-vous associé
        ...(date && {
          heureDebut: {
            gte: new Date(`${date}T00:00:00`),
            lt: new Date(`${date}T23:59:59`),
          },
        }),
      },
      orderBy: {
        heureDebut: "asc",
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des créneaux libres:', error);
    throw new Error('Impossible de récupérer les créneaux libres');
  }
}





export  async function getAllDisponibilites() {


  try {
    const disponibilites = await prisma.disponibilite.findMany({})

    return disponibilites;
  } catch (error) {
    console.log("erreur fetching disponibilites",error)
  }
}














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

export async function addRendezVous({
  patientId,
  medecinId,
  disponibiliteId,
  type,
  dateDebut,
  dateFin,
  motif,
  statut = Statut.EN_ATTENTE,
  historique,
  meta,
}: {
  patientId: string;
  medecinId: string;
  disponibiliteId: string;
  type: TypeRendezVousEnum;
  dateDebut: Date;
  dateFin?: Date;
  motif: string;
  statut?: Statut;
  historique?: any;
  meta?: any;
}) {
  try {
    return await prisma.rendezVous.create({
      data: {
        patientId,
        medecinId,
        disponibiliteId,
        type,
        dateDebut,
        dateFin,
        motif,
        statut,
        historique,
        meta,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous:', error);
    throw new Error('Impossible de créer le rendez-vous');
  }
}

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

export async function deleteRendezVous(id: string) {
  try {
    return await prisma.rendezVous.delete({ where: { id } });
  } catch (error) {
    console.error('Erreur lors de la suppression du rendez-vous:', error);
    throw new Error('Impossible de supprimer le rendez-vous');
  }
} 