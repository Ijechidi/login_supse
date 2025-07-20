import { useQuery } from "@tanstack/react-query";
import { queryKeys, UseDisponibilitesOptions } from "./useDisponibilites";
import { getRendezVousByMedecin, addRendezVous, deleteRendezVous } from "@/lib/actions/disponibilite";
import { useMemo } from "react";
import {updateRendezVousStatus} from '@/lib/actions/rendezvous'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from '@/hooks/use-toast';

export { getRendezVousByMedecin };

export function useRendezVous(
    medecinId: string, 
    date?: string,
    options: Partial<UseDisponibilitesOptions> = {}
  ) {
    const queryClient = useQueryClient();
    const query = useQuery({
      queryKey: queryKeys.rendezVous(medecinId, date),
      queryFn: () => getRendezVousByMedecin(medecinId, date),
      enabled: !!medecinId && (options.enabled !== false),
      refetchInterval: options.refetchInterval || false,
      staleTime: options.staleTime || 5 * 60 * 1000,
    });
  
    // Mutations optimistes
    const createRendezVous = useMutation({
      mutationFn: addRendezVous, // Appelle la fonction serveur qui modifie la base
      onSettled: (data, error) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.rendezVous(medecinId, date) });
        if (error) {
          toast({ title: 'Erreur', description: "Erreur lors de la création du rendez-vous.", variant: 'destructive' });
        } else {
          toast({ title: 'Succès', description: "Rendez-vous créé avec succès." });
        }
      },
    });

    const updateRendezVousMutation = useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => updateRendezVousStatus({ id, statut: data.statut }), // Appelle la fonction serveur
      onSettled: (data, error) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.rendezVous(medecinId, date) });
        if (error) {
          toast({ title: 'Erreur', description: "Erreur lors de la mise à jour du rendez-vous.", variant: 'destructive' });
        } else {
          toast({ title: 'Succès', description: "Rendez-vous mis à jour." });
        }
      },
    });

    const removeRendezVous = useMutation({
      mutationFn: deleteRendezVous, // Appelle la fonction serveur
      onSettled: (data, error) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.rendezVous(medecinId, date) });
        if (error) {
          toast({ title: 'Erreur', description: "Erreur lors de la suppression du rendez-vous.", variant: 'destructive' });
        } else {
          toast({ title: 'Succès', description: "Rendez-vous supprimé." });
        }
      },
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
      createRendezVous,
      updateRendezVous: updateRendezVousMutation,
      removeRendezVous,
    };
  }