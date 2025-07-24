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





export async function getNewVisitMedecinById(medecinId:string) {

   
    try {
        const medecin = await prisma.medecin.findUnique({
            where:{id: medecinId },
            include: {
                user: true,
                
              },
        })
        return medecin
    } catch (error) {
        console.error('Erreur lors de la recherche du médicament:', error);
        throw new Error('Impossible de trouver le médicament');
    }
}



export async function getMedecinById(medecinId:string) {

   
    try {
        const medecin = await prisma.medecin.findUnique({
            where:{id: medecinId },
            include: {
                user: true,
              },
        })
        return medecin
    } catch (error) {
        console.error('Erreur lors de la recherche du médicament:', error);
        throw new Error('Impossible de trouver le médicament');
    }
}

export async function getPatientsByMedecinId(medecinId: string) {
  return prisma.patientMedecin.findMany({
    where: { medecinId },
    include: {
      patient: {
        include: { user: true, 
                  rendezVous:true,
        },       
      },

    },
  });
}
