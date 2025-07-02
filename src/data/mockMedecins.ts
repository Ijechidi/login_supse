import { Medecin } from "@/components/ux/ProfileCard";

export const mockMedecins:  Medecin[] = [
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
