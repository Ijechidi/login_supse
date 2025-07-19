'use client'

import { getDisponibilitesWithRendezVous } from '@/lib/actions/disponibilite';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';


// Query Keys pour React Query
export const queryKeys = {
  disponibilites: (medecinId: string, date?: string) => 
    ['disponibilites', medecinId, date] as const,
  rendezVous: (medecinId: string, date?: string) => 
    ['rendezVous', medecinId, date] as const,
  disponibilitesLibres: (medecinId: string, date?: string) => 
    ['disponibilites', 'libres', medecinId, date] as const,
};

export interface UseDisponibilitesOptions {
  medecinId: string;
  date?: string;
  enabled?: boolean;
  refetchInterval?: number | false;
  staleTime?: number;
}

// Hook principal avec React Query
export function useDisponibilites({
  medecinId,
  date,
  enabled = true,
  refetchInterval = false,
  staleTime = 5 * 60 * 1000, // 5 minutes
}: UseDisponibilitesOptions) {
  const query = useQuery({
    queryKey: queryKeys.disponibilites(medecinId, date),
    queryFn: () => getDisponibilitesWithRendezVous(medecinId, date),
    enabled: enabled && !!medecinId,
    refetchInterval,
    staleTime,
    refetchOnWindowFocus: true,
  });

  // Données calculées avec useMemo pour performance
  const computedData = useMemo(() => {
    const disponibilites = query.data || [];
    
    const rendezVous = disponibilites
      .filter(disp => disp.rendezVous)
      .map(disp => disp.rendezVous!)
      .filter(Boolean);

    const disponibilitesLibres = disponibilites.filter(
      disp => disp.status === 'LIBRE' && !disp.rendezVous
    );

    const disponibilitesReservees = disponibilites.filter(
      disp => disp.status === 'RESERVE' || disp.rendezVous
    );

    return {
      disponibilites,
      rendezVous,
      disponibilitesLibres,
      disponibilitesReservees,
    };
  }, [query.data]);

  return {
    ...computedData,
    loading: query.isLoading,
    error: query.error?.message || null,
    isRefetching: query.isRefetching,
    refetch: query.refetch,
    invalidate: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({
        queryKey: queryKeys.disponibilites(medecinId, date)
      });
    },
  };
}
