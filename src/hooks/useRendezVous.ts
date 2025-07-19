import { useQuery } from "@tanstack/react-query";
import { queryKeys, UseDisponibilitesOptions } from "./useDisponibilites";
import { getRendezVousByMedecin } from "@/lib/actions/disponibilite";
import { useMemo } from "react";

export function useRendezVous(
    medecinId: string, 
    date?: string,
    options: Partial<UseDisponibilitesOptions> = {}
  ) {
    const query = useQuery({
      queryKey: queryKeys.rendezVous(medecinId, date),
      queryFn: () => getRendezVousByMedecin(medecinId, date),
      enabled: !!medecinId && (options.enabled !== false),
      refetchInterval: options.refetchInterval || false,
      staleTime: options.staleTime || 5 * 60 * 1000,
    });
  
    const computedData = useMemo(() => {
      const rendezVous = query.data || [];
      
      const rendezVousConfirmes = rendezVous.filter(rdv => rdv.statut === 'CONFIRME');
      const rendezVousEnAttente = rendezVous.filter(rdv => rdv.statut === 'EN_ATTENTE');
      const rendezVousAujourdhui = rendezVous.filter(rdv => {
        const today = new Date().toDateString();
        return new Date(rdv.dateDebut).toDateString() === today;
      });
  
      return {
        rendezVous,
        rendezVousConfirmes,
        rendezVousEnAttente,
        rendezVousAujourdhui,
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