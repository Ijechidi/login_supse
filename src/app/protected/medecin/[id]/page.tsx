import React from "react";
import AvatarUser from "@/components/ux/Avatar";

// Données mockées pour les médecins (même structure que MedecinList)
const medecins = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@exemple.com",
    specialite: "Cardiologue",
    avatarUrl: "/avatars/jean.jpg",
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@exemple.com",
    specialite: "Dermatologue",
    avatarUrl: "/avatars/sophie.jpg",
  },
  {
    id: "3",
    nom: "Nguyen",
    prenom: "Thierry",
    email: "thierry.nguyen@exemple.com",
    specialite: "Généraliste",
    avatarUrl: "/avatars/thierry.jpg",
  },
];

interface MedecinPagePros {
  params: {
    id: string;
  };
}

export default function MedecinDetailPage({ params }: MedecinPagePros) {
  // Récupère l'id du médecin depuis les params de la page dynamique
  const { id } = params;
  const medecin = medecins.find((m) => m.id === id);

  if (!medecin) {
    return <div className="p-8 text-center">Médecin introuvable.</div>;
  }

  return (
    <div className="flex flex-col w-screen items-center justify-center  bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full text-center">

          <div className=" border rounded-full">
            <AvatarUser className="w-32 h-32" />
          </div>
          <h2 className="text-xl font-bold mb-1">
            Dr {medecin.prenom} {medecin.nom}
          </h2>
         
        </div>


    </div>
  );
}

// Pour Next.js App Router (pages dynamiques)
export async function generateStaticParams() {
  return medecins.map((medecin) => ({ id: medecin.id }));
}


/* 
 <div className="text-gray-500 mb-1">{medecin.specialite}</div>
          <div className="text-gray-400 text-sm">{medecin.email}</div>
*/