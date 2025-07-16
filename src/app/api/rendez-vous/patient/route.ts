
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/users/getUser"; // ou ta fonction équivalente
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return new Response("Non autorisé", { status: 401 });

  const body = await req.json();
  const { medecinId, date, heure, motif, type } = body;

  if (!medecinId || !date || !heure || !motif) {
    return new Response("Champs requis manquants", { status: 400 });
  }

  try {
    // Récupérer l'ID du patient depuis l'utilisateur connecté
    const patient = await prisma.patient.findUnique({
      where: { id: user.id },
    });

    if (!patient) return new Response("Patient introuvable", { status: 404 });

    // Créer le rendez-vous
    const rendezVous = await prisma.rendezVous.create({
      data: {
        patientId: patient.id,
        medecinId,
        dateDebut:new Date(date),
         dateFin : new Date(date),
        type:type || "CONSULTATION" ,
        motif ,
      },
    });

    return Response.json({ success: true, rendezVous });
  } catch (error) {
    console.error(error);
    return new Response("Erreur serveur", { status: 500 });
  }
}
