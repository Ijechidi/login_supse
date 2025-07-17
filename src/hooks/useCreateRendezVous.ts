import { useCallback, useState } from "react";
import { TypeRendezVousEnum } from "@/types/rendezVous";
import { Statut } from "@/types/types";
import { createRendezVous } from "@/app/actions/rendezvous";

export interface CreateRendezVousPayload {
  patientId: string;
  medecinId: string;
  dateDebut: Date;
  dateFin?: Date;
  motif: string;
  type: TypeRendezVousEnum;
  statut?: Statut;
  meta?: any;
}

export function useCreateRendezVous() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createRendezVousPatient = useCallback(async (payload: CreateRendezVousPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const rdv = await createRendezVous({
        ...payload,
        statut: payload.statut || "en_attente",
      });
      setSuccess(true);
      return rdv;
    } catch (e: any) {
      setError(e?.message || "Erreur lors de la création du rendez-vous");
      setSuccess(false);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createRendezVousPatient,
    loading,
    error,
    success,
  };
} 