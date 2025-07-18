"use client";
import { useState, useCallback, useEffect } from "react";
import {
  createRendezVous,
  cancelRendezVous,
  getDisponibilitesWithRendezVous,
} from "@/app/actions/rendezvous";

export function useRendezVous(medecinId: string, date?: string) {
  const [rendezVous, setRendezVous] = useState<any[]>([]); // à plat
  const [disponibilites, setDisponibilites] = useState<any[]>([]); // uniquement dispo
  const [disponibilitesAvecRendezVous, setDisponibilitesAvecRendezVous] = useState<any[]>([]); // dispo + rdv
  const [groupedRendezVous, setGroupedRendezVous] = useState<Record<string, any[]>>({}); // {dispoId: [rdv]}
  const [loading, setLoading] = useState(false);

  const fetchRendezVous = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDisponibilitesWithRendezVous(medecinId, date);

      const allRdv = data.flatMap((dispo) => dispo.rendezVous || []);
      const onlyDispos = data.map(({ rendezVous, ...rest }) => rest);
      const rdvGrouped = data.reduce((acc, dispo) => {
        acc[dispo.id] = Array.isArray(dispo.rendezVous) ? dispo.rendezVous : [];
        return acc;
      }, {} as Record<string, any[]>);

      setDisponibilitesAvecRendezVous(data);
      setDisponibilites(onlyDispos);
      setRendezVous(allRdv);
      setGroupedRendezVous(rdvGrouped);
    } finally {
      setLoading(false);
    }
  }, [medecinId, date]);

  const create = useCallback(
    async (payload: any) => {
      const rdv = await createRendezVous(payload);
      setRendezVous((prev) => [...prev, rdv]);
      fetchRendezVous(); // refresh total
      return rdv;
    },
    [fetchRendezVous]
  );

  const cancel = useCallback(
    async (id: string) => {
      await cancelRendezVous(id);
      setRendezVous((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: "annule" } : r))
      );
      setDisponibilitesAvecRendezVous((prev) =>
        prev.map((dispo) => ({
          ...dispo,
          rendezVous: dispo.rendezVous.map((r:any) =>
            r.id === id ? { ...r, statut: "annule" } : r
          ),
        }))
      );
    },
    []
  );

  useEffect(() => {
    if (medecinId) {
      fetchRendezVous();
    }
  }, [fetchRendezVous, medecinId]);

  return {
    loading,

    // Données disponibles :
    rendezVous,                     // à plat
    disponibilites,                // sans les rendez-vous
    disponibilitesAvecRendezVous,  // structure complète
    groupedRendezVous,             // { dispoId: [rdv, rdv] }

    // Fonctions
    fetchRendezVous,
    create,
    cancel,
  };
}
