import { specialites } from "@/data/mockSpecialites";
import { Medecin } from "@/components/ux/ProfileCard";

export function getMedecinById(id: string): Medecin | null {
  for (const specialite of specialites) {
    const medecin = specialite.medecins.find(m => m.id === id);
    if (medecin) {
      return medecin;
    }
  }
  return null;
} 