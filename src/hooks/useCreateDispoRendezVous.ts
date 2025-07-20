import { useMutation } from "@tanstack/react-query";
import createRendezVous from "@/lib/actions/rendezvous";
import { TypeRendezVousEnum, Statut } from "@prisma/client";

interface CreateDispoRendezVousInput {
  disponibiliteId: string;
  motif: string;
  type: TypeRendezVousEnum;
  meta?: any;
}

export function useCreateDispoRendezVous() {
  const mutation = useMutation({
    mutationFn: async (data: CreateDispoRendezVousInput) => {
      return await createRendezVous(data);
    },
  });

  return {
    createDispoRendezVous: mutation.mutate,
    ...mutation,
  };
}
