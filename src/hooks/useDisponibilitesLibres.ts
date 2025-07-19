import { useQuery } from "@tanstack/react-query";
import { queryKeys, UseDisponibilitesOptions } from "./useDisponibilites";
import { getDisponibilitesLibres } from "@/lib/actions/disponibilite";
import { useMemo } from "react";
import { DisponibiliteWithRendezVous } from "@/types/types";

// Hook pour les disponibilités libres
export function useDisponibilitesLibres(
    medecinId: string,
    date?: string,
    options: Partial<UseDisponibilitesOptions> = {}
  ) {
    const query = useQuery({
      queryKey: queryKeys.disponibilitesLibres(medecinId, date),
      queryFn: () => getDisponibilitesLibres(medecinId, date),
      enabled: !!medecinId && (options.enabled !== false),
      refetchInterval: options.refetchInterval || false,
      staleTime: options.staleTime || 5 * 60 * 1000,
    });
  
    const computedData = useMemo(() => {
      const disponibilitesLibres = query.data || [];
  
      // Créneaux groupés par heure
      const creneauxParHeure = disponibilitesLibres.reduce((acc, disp) => {
        const heure = new Date(disp.heureDebut).getHours();
        if (!acc[heure]) acc[heure] = [];
        acc[heure].push(disp);
        return acc;
      }, {} as Record<number, DisponibiliteWithRendezVous[]>);
  
      // Prochain créneau libre
      const prochainCreneauLibre = disponibilitesLibres
        .filter(disp => new Date(disp.heureDebut) > new Date())
        .sort((a, b) => new Date(a.heureDebut).getTime() - new Date(b.heureDebut).getTime())[0];
  
      return {
        disponibilitesLibres,
        creneauxParHeure,
        prochainCreneauLibre,
        nombreCreneauxLibres: disponibilitesLibres.length,
      };
    }, [query.data]);
  
    return {
      ...computedData,
      loading: query.isLoading,
      error: query.error?.message || null,
      isRefetching: query.isRefetching,
      refetch: query.refetch,
    };
  }