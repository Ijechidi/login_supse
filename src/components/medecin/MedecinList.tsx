
import React from "react";
import Link from "next/link";
import AvatarUser from "@/components/ux/Avatar";

// Données mockées pour les médecins
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

export default function MedecinList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {medecins.map((medecin) => (
        <Link
          key={medecin.id}
          href={`/protected/medecin/${medecin.id}`}
          className="flex flex-col items-center text-center rounded-lg border p-4 shadow-sm bg-white h-full hover:bg-gray-50 transition cursor-pointer focus:outline-none"
        >
          <div className="w-16 h-16 mb-3">
            <AvatarUser />
          </div>
          <div className="font-semibold text-base">
            Dr {medecin.prenom} {medecin.nom}
          </div>
          <div className="text-sm text-gray-500">{medecin.specialite}</div>
          <div className="text-xs text-gray-400">{medecin.email}</div>
        </Link>
      ))}
    </div>
  );
}