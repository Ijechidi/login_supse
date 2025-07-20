import { useMemo } from "react";
import { Medecin } from "@/components/ux/ProfileCard";
import { useMedecins } from "@/hooks/useMedecins";

// Constantes de description par spécialité (clés = enum Prisma)
const SPECIALITE_DESCRIPTIONS: Record<string, string> = {
  "MEDECINE_GENERALE": "La médecine générale est la première étape du parcours de soins. Le médecin généraliste assure le suivi, la prévention et l’orientation vers des spécialistes.",
  "CARDIOLOGIE": "La cardiologie s’occupe du diagnostic et du traitement des maladies du cœur et des vaisseaux sanguins.",
  "DERMATOLOGIE": "La dermatologie traite les maladies de la peau, des cheveux et des ongles.",
  "PEDIATRIE": "La pédiatrie prend en charge la santé des enfants, de la naissance à l’adolescence.",
  "GYNECOLOGIE": "La gynécologie concerne la santé de la femme et le suivi de la grossesse.",
  "NEUROLOGIE": "La neurologie traite les maladies du système nerveux (cerveau, moelle, nerfs).",
  "OPHTALMOLOGIE": "L’ophtalmologie s’occupe de la santé des yeux et de la vision.",
  "ORTHOPEDIE": "L’orthopédie prend en charge les pathologies des os, articulations et muscles.",
};

export function useSpecialites() {
  const { medecins, loading, isFetching, error, refetch } = useMedecins();

  const specialites = useMemo(() => {
    return Object.entries(SPECIALITE_DESCRIPTIONS).map(([nom, description]) => ({
      nom,
      description,
      medecins: medecins.filter(med => med.specialite === nom),
    }));
  }, [medecins]);

  // loading : vrai uniquement au tout premier chargement
  // isFetching : vrai lors d'un refetch silencieux (données affichées pendant le refresh)
  return { specialites, loading, isFetching, error, refetch };
} 