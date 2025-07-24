import { prisma } from "@/lib/prisma";

export async function getPatientById(patientId: string) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        user: true,
        rendezVous:true,
      },
    });
    return patient;
  } catch (error) {
    console.error('Erreur lors de la récupération du patient :', error);
    throw new Error('Impossible de trouver le patient');
  }
}
