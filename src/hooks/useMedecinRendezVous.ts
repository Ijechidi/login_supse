import { useState, useEffect, useCallback } from "react";

export function useMedecinRendezVous(medecinId: string) {
  const [rendezVous, setRendezVous] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRendezVous = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/rendez-vous?medecinId=${medecinId}`);
    const data = await res.json();
    setRendezVous(data);
    setLoading(false);
  }, [medecinId]);

  useEffect(() => {
    fetchRendezVous();
  }, [fetchRendezVous]);

  return { rendezVous, loading };
} 