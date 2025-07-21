import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import createRendezVous from "@/lib/actions/rendezvous";
import { TypeRendezVousEnum } from "@prisma/client";

interface CreateDispoRendezVousInput {
  disponibiliteId: string;
  motif: string;
  type: TypeRendezVousEnum;
  meta?: any;
}

export function useCreateDispoRendezVous() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (data: CreateDispoRendezVousInput) => {
      return await createRendezVous(data);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Rendez-vous créé avec succès !",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    },
  });

  return {
    createDispoRendezVous: mutation.mutate,
    ...mutation,
  };
}
