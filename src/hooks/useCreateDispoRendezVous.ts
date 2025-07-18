"use client";

import { useMutation } from "@tanstack/react-query";
import { creerRendezVousDepuisDisponibilite } from "@/app/actions/rendezvous";

export function useCreateDispoRendezVous() {
  return useMutation({
    mutationFn: async ({
      disponibiliteId,
      motif,
      type,
    }: {
      disponibiliteId: string;
      motif: string;
      type: "CONSULTATION" | "SUIVI" | "URGENCE" | "TELECONSULTATION";
    }) => {
      const formData = new FormData();
      formData.append("disponibiliteId", disponibiliteId);
      formData.append("motif", motif);
      formData.append("type", type);
      return await creerRendezVousDepuisDisponibilite(formData);
    },
  });
}
