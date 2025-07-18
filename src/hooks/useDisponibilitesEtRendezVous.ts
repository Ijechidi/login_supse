"use client";

import { useState, useEffect, useCallback } from "react";
import { createRendezVous, cancelRendezVous,getDisponibilitesWithRendezVous } from "@/app/actions/rendezvous";

export function useRendezVousWithDispo(medecinId: string, date: string) {
  const [rendezvousWithDispo, setRendezvousWithDispo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Extrait tous les rendez-vous (plats) des disponibilités avec rdv
  const rendezVous = rendezvousWithDispo.flatMap((d) => d.rendezVous ?? []);

  // Extrait juste les disponibilités (brutes)
  const disponibilites = rendezvousWithDispo;

  // Fetch les dispos + rdv liés
  const fetchRendezVous = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDisponibilitesWithRendezVous(medecinId, date);
      setRendezvousWithDispo(data);
    } finally {
      setLoading(false);
    }
  }, [medecinId, date]);

  // Création d'un RDV (rafraîchit après)
  const create = useCallback(
    async (payload: any) => {
      const rdv = await createRendezVous(payload);
      await fetchRendezVous();
      return rdv;
    },
    [fetchRendezVous]
  );

  // Annulation d'un RDV (rafraîchit après)
  const cancel = useCallback(
    async (id: string) => {
      await cancelRendezVous(id);
      await fetchRendezVous();
    },
    [fetchRendezVous]
  );

  useEffect(() => {
    if (medecinId && date) {
      fetchRendezVous();
    }
  }, [fetchRendezVous, medecinId, date]);

  return {
    rendezvousWithDispo,  // la donnée brute complète dispo+rdv
    rendezVous,          // tableau plat des rdv extraits
    disponibilites,      // dispo sans transformation (avec rdv inclus)
    loading,
    fetchRendezVous,
    create,
    cancel,
  };
}
