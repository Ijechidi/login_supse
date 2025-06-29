import { Specialite } from "@/components/ux/SpecialiteCard";

export const specialites: Specialite[] = [
  {
    nom: "Cardiologie",
    description: "Spécialité médicale qui traite les maladies du cœur et des vaisseaux sanguins",
    medecins: [
        {
    id: "1",
    nom: "Dossou",
    prenom: "Julien",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    specialite: "Cardiologue",
    telephone: "228 90 00 00 01",
    isDisponible: true,
    
  },
  {
    id: "2",
    nom: "Kossi",
    prenom: "Afi",
    avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    specialite: "Pédiatre",
    telephone: "228 90 00 00 02",
    isDisponible: false,
  },
  {
    id: "3",
    nom: "Agbeko",
    prenom: "Samuel",
    avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    specialite: "Dermatologue",
    telephone: "228 90 00 00 03",
    isDisponible: true,
  },
    ]
  },
  {
    nom: "Pédiatrie",
    description: "Médecine spécialisée dans les soins aux enfants et adolescents",
    medecins: [
      {
        id: "4",
        nom: "Lawson",
        prenom: "Dr. Koku",
        specialite: "Pédiatrie",
        telephone: "+228 93 45 67 89",
        isDisponible: true,
        avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
      },
      {
        id: "5",
        nom: "Gbadamosi",
        prenom: "Dr. Fatima",
        specialite: "Pédiatrie",
        telephone: "+228 94 56 78 90",
        isDisponible: true,
          avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
      }
    ]
  }
]