"use server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { sendMail } from '@/lib/sendMail';

import { Statut, TypeRendezVousEnum } from "@prisma/client";


export async function getRendezvousById(visitId:string) {
    try {
      const rendezVous = await prisma.rendezVous.findUnique({
        where:{id:visitId},
        include: {
          patient: { include: { user: true } },
          medecin: { include: { user: true } },
        },
      })

      return rendezVous
    } catch (error) {
      
      console.error('Erreur lors de la recherche du rendez-vous:', error);
      throw new Error('Impossible de trouver le rendez-vous');
      
    }
}



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

// Fonction externe pour notifier le patient par mail
export async function notifyPatientRendezVousStatus(rendezVous: any, statut: string) {
  if (rendezVous.patient?.user?.email) {
    let subject = '';
    let text = '';
    if (statut === 'CONFIRME') {
      subject = 'Votre rendez-vous a été confirmé';
      text = `Bonjour ${rendezVous.patient.user.prenom},\n\nVotre rendez-vous avec le Dr. ${rendezVous.medecin.user.nom} a été confirmé.`;
    } else if (statut === 'ANNULE') {
      subject = 'Votre rendez-vous a été annulé';
      text = `Bonjour ${rendezVous.patient.user.prenom},\n\nVotre rendez-vous avec le Dr. ${rendezVous.medecin.user.nom} a été annulé.`;
    }
    if (subject) {
      await sendMail({
        to: rendezVous.patient.user.email,
        subject,
        text,
      });
    }
  }
}




export async function createMedecinRendevous({  patientId,
  medecinId, disponibiliteId , type, motif }:{
  patientId: string;
  medecinId: string;
  disponibiliteId: string;
  type: TypeRendezVousEnum;
  motif: string;

  }) {
   try {

    // Récupérer la disponibilité
    const disponibilite = await prisma.disponibilite.findUnique({
      where: { id: disponibiliteId },
    });
    if (!disponibilite) {
      throw new Error("Disponibilité introuvable");
    }
    
     const rendevous = await prisma.rendezVous.create({
       data: {
         patientId,
         medecinId,
         disponibiliteId,
         type,
         motif,
         dateDebut: disponibilite.heureDebut,
         dateFin:disponibilite.heureFin,
       },
     })
     console.log("rendevous cree :", rendevous)
     return rendevous;
   } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    throw error;
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

export async function updateRendezVousStatus({ id, statut }: { id: string; statut: Statut }) {
  // Log des données reçues
  console.log('updateRendezVousStatus called with:', { id, statut });
  // Met à jour le statut du rendez-vous
  const rendezVous = await prisma.rendezVous.update({
    where: { id },
    data: { statut },
    include: {
      patient: { include: { user: true } },
      medecin: { include: { user: true } },
    },
  });
  console.log('RendezVous updated:', rendezVous);

  // Notifie le patient par mail
  await notifyPatientRendezVousStatus(rendezVous, statut);

  // Si confirmé, ajoute le patient à la liste des patients du médecin
  if (statut === 'CONFIRME') {
    await prisma.patientMedecin.upsert({
      where: {
        patientId_medecinId: {
          patientId: rendezVous.patientId,
          medecinId: rendezVous.medecinId,
        },
      },
      update: {},
      create: {
        patientId: rendezVous.patientId,
        medecinId: rendezVous.medecinId,
      },
    });
  }

  return rendezVous;
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


export async function getMedecinRdv(medecinId: string) {
  return prisma.rendezVous.findMany({
    where: { medecinId },
    include: {
      patient: { include: { user: true } },
      medecin: { include: { user: true } },
    },
    orderBy: { dateDebut: 'asc' },
  });
}

// Rendez-vous à venir du patient (statut EN_ATTENTE ou CONFIRME, dateDebut >= aujourd'hui)
export async function getPatientRendezVous(patientId: string) {
  const now = new Date();
  return prisma.rendezVous.findMany({
    where: {
      patientId,
      dateDebut: { gte: now },
      statut: { in: ['EN_ATTENTE', 'CONFIRME'] },
    },
    include: {
      medecin: { include: { user: true } },
    },
    orderBy: { dateDebut: 'asc' },
  });
}

// Anciennes visites du patient (statut TERMINE ou dateDebut < aujourd'hui)
export async function getPatientAnciennesVisites(patientId: string) {
  const now = new Date();
  return prisma.rendezVous.findMany({
    where: {
      patientId,
      OR: [
        { statut: 'TERMINE' },
        { dateDebut: { lt: now } },
      ],
    },
    include: {
      medecin: { include: { user: true } },
    },
    orderBy: { dateDebut: 'desc' },
  });
}

// Médecins référents du patient (table de liaison patientMedecin)
export async function getPatientMedecins(patientId: string) {
  const relations = await prisma.patientMedecin.findMany({
    where: { patientId },
    include: {
      medecin: { include: { user: true } },
    },
  });
  return relations.map(rel => rel.medecin);
}

export async function getNextRendezVousForMedecin(medecinId: string) {
  const now = new Date();
  return prisma.rendezVous.findFirst({
    where: {
      medecinId,
      dateDebut: { gte: now },
      statut: { in: ['EN_ATTENTE', 'CONFIRME'] },
    },
    include: {
      patient: { include: { user: true } },
      medecin: { include: { user: true } },
    },
    orderBy: { dateDebut: 'asc' },
  });
}