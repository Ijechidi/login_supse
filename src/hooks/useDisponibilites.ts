"use client";
import { useState, useCallback, useEffect } from "react";
import {
  getDisponibilitesByMedecin,
  addDisponibilite,
  deleteDisponibilite,
  updateDisponibilite,
} from "@/app/actions/disponibilite";

export function useDisponibilites(medecinId: string, autoFetch: boolean = false) {
  const [disponibilites, setDisponibilites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDisponibilites = useCallback(async () => {
    setLoading(true);
    const data = await getDisponibilitesByMedecin(medecinId);
    const parsed = data.map((d: any) => ({
    
      ...d,
      heureDebut: d.heureDebut ? new Date(d.heureDebut) : null,
      heureFin: d.heureFin ? new Date(d.heureFin) : null,
    }));
    setDisponibilites(parsed);
    setLoading(false);
  }, [medecinId]);

  const add = useCallback(async (payload: { heureDebut: Date; heureFin: Date; jour?: string; meta?: any }) => {
    const dispo = await addDisponibilite({ medecinId, ...payload });
    setDisponibilites((prev) => [...prev, dispo]);
    return dispo;
  }, [medecinId]);

  const remove = useCallback(async (id: string) => {
    await deleteDisponibilite(id);
    setDisponibilites((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const update = useCallback(async (id: string, data: Partial<{ jour: string; heureDebut: Date; heureFin: Date; meta: any }>) => {
    const dispo = await updateDisponibilite(id, data);
    setDisponibilites((prev) => prev.map((d) => (d.id === id ? dispo : d)));
    return dispo;
  }, []);

  // ✅ Auto-fetch si demandé
  useEffect(() => {
    if (autoFetch) {
      fetchDisponibilites();
    }
  }, [fetchDisponibilites, autoFetch]);

  return {
    disponibilites,
    loading,
    fetchDisponibilites,
    add,
    remove,
    update,
  };
}
