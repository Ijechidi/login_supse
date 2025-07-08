import { useState, useEffect, useCallback } from "react";

export function usePatientRendezVous(patientId: string) {
  const [rendezVous, setRendezVous] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRendezVous = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/rendez-vous?patientId=${patientId}`);
    const data = await res.json();
    setRendezVous(data);
    setLoading(false);
  }, [patientId]);

  useEffect(() => {
    fetchRendezVous();
  }, [fetchRendezVous]);

  return { rendezVous, loading };
} 