import { useState, useEffect, useCallback } from "react";

export function useMedecinDisponibilites(medecinId: string) {
  const [disponibilites, setDisponibilites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDisponibilites = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/medecins/${medecinId}/disponibilites`);
    const data = await res.json();
    setDisponibilites(data);
    setLoading(false);
  }, [medecinId]);

  const addDisponibilite = useCallback(async (dispo: any) => {
    const res = await fetch(`/api/medecins/${medecinId}/disponibilites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dispo),
    });
    if (res.ok) fetchDisponibilites();
  }, [medecinId, fetchDisponibilites]);

  const removeDisponibilite = useCallback(async (id: string) => {
    const res = await fetch(`/api/medecins/${medecinId}/disponibilites/${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchDisponibilites();
  }, [medecinId, fetchDisponibilites]);

  useEffect(() => {
    fetchDisponibilites();
  }, [fetchDisponibilites]);

  return { disponibilites, loading, addDisponibilite, removeDisponibilite };
} 