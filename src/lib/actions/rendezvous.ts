"use server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { Statut, TypeRendezVousEnum } from "@prisma/client";



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

export async function getAllRendezvousByMedecinId({medecinId}:{medecinId:string}){
    const rendezVous = await prisma.rendezVous.findMany({
      where:{medecinId},
      orderBy:{dateDebut:"desc"}
    })

    return rendezVous;
}

export async function getAllRendezvousByMedecinAndPatient({medecinId, patientId}:{medecinId:string, patientId:string }){

  const rendezVous = await prisma.rendezVous.findMany({
    where:{medecinId ,
      patientId
    },
    orderBy:{dateDebut:"desc"}
  })

  return rendezVous;
}


// actions/disponibilite.ts

export async function getDisponibilitesWithRendezVous(medecinId: string, date?: string) {
  return prisma.disponibilite.findMany({
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
}





// export async function createRendezVous(data: {
//   disponibiliteId: string;
//   patientId: string;
//   medecinId: string;
//   dateDebut: Date;
//   dateFin?: Date;
//   motif: string;
//   statut?: Statut;
//   type: TypeRendezVousEnum;
//   meta?: any;
// }) {
//   return prisma.rendezVous.create({
//     data,
//   });
// }

export async function cancelRendezVous(id: string) {
  return prisma.rendezVous.update({
    where: { id },
    data: { statut: "ANNULE" },
  });
} 


/* 

cree rendevous depuis disponibilite
*/




export default async function createRendezVous(data:{disponibiliteId: string; patientId?: string; motif: string; statut?: Statut; type: TypeRendezVousEnum; meta?: any;}) {

  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { success: false, error: "Utilisateur non authentifié." };
  }

  const patientId = authUser.id;
  const {disponibiliteId, motif, statut, type, meta} = data;

  try {
    // Vérifie que la disponibilité existe et est libre
    const dispo = await prisma.disponibilite.findUnique({
      where: { id: disponibiliteId },
    });

    if (!dispo) {
      return { success: false, error: "Disponibilité introuvable." };
    }

    if (dispo.status !== "LIBRE") {
      return { success: false, error: "Cette disponibilité est déjà réservée." };
    }

    // Utiliser les heures du créneau pour le rendez-vous
    const dateDebut = dispo.heureDebut;
    const dateFin = dispo.heureFin;
    const medecinId = dispo.medecinId;

    const rendezVous = await prisma.rendezVous.create({
      data: {
        disponibiliteId,
        patientId,
        medecinId,
        dateDebut,
        dateFin,
        motif,
        statut,
        type,
        meta,
      },
    }); 

    await prisma.disponibilite.update({
      where: { id: disponibiliteId },
      data: { status: "RESERVE" },
    });

    return { success: true, rendezVous };
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    return { success: false, error: "Impossible de créer le rendez-vous." };
  }
}
