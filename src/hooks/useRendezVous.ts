"use client";
import { useState, useCallback, useEffect } from "react";
import { getRendezVousByMedecin, createRendezVous, cancelRendezVous } from "@/app/actions/rendezvous";

export function useRendezVous(medecinId: string, date?: string) {
  const [rendezVous, setRendezVous] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRendezVous = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRendezVousByMedecin(medecinId, date);
      setRendezVous(data);
    } finally {
      setLoading(false);
    }
  }, [medecinId, date]);

  const create = useCallback(
    async (payload: any) => {
      const rdv = await createRendezVous(payload);
      setRendezVous((prev) => [...prev, rdv]);
      return rdv;
    },
    []
  );

  const cancel = useCallback(
    async (id: string) => {
      await cancelRendezVous(id);
      setRendezVous((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: "annule" } : r))
      );
    },
    []
  );

  // Auto-fetch au montage et quand medecinId ou date changent
  useEffect(() => {
    if (medecinId) {
      fetchRendezVous();
    }
  }, [fetchRendezVous, medecinId]);

  return {
    rendezVous,
    loading,
    fetchRendezVous,
    create,
    cancel,
  };
}
