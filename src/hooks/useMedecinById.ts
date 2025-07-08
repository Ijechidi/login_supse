import { useEffect } from "react";
import { useSpecialitesStore } from "@/store/useSpecialitesStore";

export function useMedecinById(medecinId: string) {
  const { specialites, loading, fetchSpecialites, getMedecinById } = useSpecialitesStore();
  const medecin = getMedecinById(medecinId);

  useEffect(() => {
    if (!medecin && !loading) {
      fetchSpecialites();
    }
  }, [medecin, loading, fetchSpecialites]);

  return { medecin, loading };
} 