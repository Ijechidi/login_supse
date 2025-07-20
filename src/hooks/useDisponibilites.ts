'use client'

import { getDisponibilitesWithRendezVous, updateDisponibilite } from '@/lib/actions/disponibilite';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { addDisponibilite, deleteDisponibilite } from '@/lib/actions/disponibilite';
import { useMutation } from '@tanstack/react-query';


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
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.disponibilites(medecinId, date),
    queryFn: () => getDisponibilitesWithRendezVous(medecinId, date),
    enabled: enabled && !!medecinId,
    refetchInterval,
    staleTime,
    refetchOnWindowFocus: true,
  });

  // Mutations
  const createDisponibilite = useMutation({
    mutationFn: addDisponibilite,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.disponibilites(medecinId, date) });
      const previous = queryClient.getQueryData(queryKeys.disponibilites(medecinId, date));
      queryClient.setQueryData(queryKeys.disponibilites(medecinId, date), (old: any[] = []) => [
        ...(old || []),
        { ...newData, id: Math.random().toString() } // id temporaire
      ]);
      return { previous };
    },
    onError: (err, newData, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.disponibilites(medecinId, date), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.disponibilites(medecinId, date) });
    },
  });

  // const updateDisponibiliteMutation = useMutation({
  //   mutationFn: ({ id, data }: { id: string; data: any }) => updateDisponibilite(id, data),
  //   onMutate: async ({ id, data }) => {
  //     await queryClient.cancelQueries({ queryKey: queryKeys.disponibilites(medecinId, date) });
  //     const previous = queryClient.getQueryData(queryKeys.disponibilites(medecinId, date));
  //     queryClient.setQueryData(queryKeys.disponibilites(medecinId, date), (old: any[] = []) =>
  //       (old || []).map(item => item.id === id ? { ...item, ...data } : item)
  //     );
  //     return { previous };
  //   },
  //   onError: (err, newData, context) => {
  //     if (context?.previous) {
  //       queryClient.setQueryData(queryKeys.disponibilites(medecinId, date), context.previous);
  //     }
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: queryKeys.disponibilites(medecinId, date) });
  //   },
  // });

  const removeDisponibilite = useMutation({
    mutationFn: deleteDisponibilite,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.disponibilites(medecinId, date) });
      const previous = queryClient.getQueryData(queryKeys.disponibilites(medecinId, date));

      
      queryClient.setQueryData(queryKeys.disponibilites(medecinId, date), (old: any[] = []) =>
        (old || []).filter(item => item.id !== id)
      );

      return { previous };
    },
    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.disponibilites(medecinId, date), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.disponibilites(medecinId, date) });
    },
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.disponibilites(medecinId, date)
      });
    },
    // Ajout des mutations CRUD
    createDisponibilite,
    // updateDisponibilite: updateDisponibiliteMutation,
    removeDisponibilite,
  };
}
