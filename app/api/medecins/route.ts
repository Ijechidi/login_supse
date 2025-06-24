import { prisma } from "@/lib/prisma";


export const medecins = [
  {
    id: "1",
    specialite: "Cardiologie",
    user: {
      nom: "Dupont",
      prenom: "Jean",
      avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  },
  {
    id: "2",
    specialite: "Cardiologie",
    user: {
      nom: "Martin",
      prenom: "Sophie",
      avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  },
  {
    id: "3",
    specialite: "Dermatologie",
    user: {
      nom: "Bernard",
      prenom: "Luc",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: "4",
    specialite: "Dermatologie",
    user: {
      nom: "Petit",
      prenom: "Élise",
      avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  },
  {
    id: "5",
    specialite: "Pédiatrie",
    user: {
      nom: "Durand",
      prenom: "Thomas",
      avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  },
  {
    id: "6",
    specialite: "Pédiatrie",
    user: {
      nom: "Leroy",
      prenom: "Camille",
      avatarUrl: null // Médecin sans avatar
    }
  },
  {
    id: "7",
    specialite: "Neurologie",
    user: {
      nom: "Moreau",
      prenom: "Antoine",
      avatarUrl: "https://randomuser.me/api/portraits/men/83.jpg"
    }
  },
  {
    id: "8",
    specialite: "Gynécologie",
    user: {
      nom: "Lefebvre",
      prenom: "Marie",
      avatarUrl: "https://randomuser.me/api/portraits/women/19.jpg"
    }
  }
] as const;



export async function GET() {
  try {
    // const medecins = await prisma.medecin.findMany({
    //   include: {
    //     user: true,
    //   },
    // });


    console.log("Médecins récupérés :", medecins);

    return Response.json(medecins, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins :", error);

    return Response.json(
      { message: "Une erreur est survenue lors de la récupération des médecins." },
      { status: 500 }
    );
  }
}
