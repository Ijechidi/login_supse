"use server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { TypeRendezVousEnum } from "@/types/rendezVous";
import { Statut } from "@/types/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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





export async function createRendezVous(data: {
  disponibiliteId: string;
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


/* 

cree rendevous depuis disponibilite
*/


const creerRendezVousSchema = z.object({
  disponibiliteId: z.string().uuid(),
  motif: z.string().min(3),
  type: z.enum(["CONSULTATION", "SUIVI", "URGENCE", "TELECONSULTATION"]),
});

export async function creerRendezVousDepuisDisponibilite(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = creerRendezVousSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.format() };
  }

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return { success: false, error: "Utilisateur non authentifié." };
  }

  const patientId = authUser.id;

  const { disponibiliteId, motif, type } = parsed.data;

  const disponibilite = await prisma.disponibilite.findUnique({
    where: { id: disponibiliteId },
  });

  if (!disponibilite || disponibilite.status !== "LIBRE") {
    return {
      success: false,
      error: { disponibilite: "Ce créneau n’est pas disponible." },
    };
  }

  const rendezVous = await prisma.rendezVous.create({
    data: {
      disponibiliteId,
      patientId,
      medecinId: disponibilite.medecinId,
      type,
      motif,
      dateDebut: disponibilite.heureDebut,
      dateFin: disponibilite.heureFin,
    },
  });

  await prisma.disponibilite.update({
    where: { id: disponibiliteId },
    data: { status: "RESERVE" },
  });

  revalidatePath("/rendezvous");
  return { success: true, rendezVous };
}