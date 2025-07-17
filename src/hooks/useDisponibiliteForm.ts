"use client"
import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDisponibilites } from "./useDisponibilites";


export function useDisponibiliteForm(medecinId: string) {
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const { toast } = useToast();
  const { add, loading } = useDisponibilites(medecinId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await add({
        heureDebut: new Date(heureDebut),
        heureFin: new Date(heureFin),
      });

      toast({
        title: "Créneau ajouté",
        description: "Le créneau est disponible.",
      });

      setHeureDebut("");
      setHeureFin("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Erreur",
        description: "Impossible d’ajouter la disponibilité.",
        variant: "destructive",
      });
    }
  };

  return {
    heureDebut,
    setHeureDebut,
    heureFin,
    setHeureFin,
    handleSubmit,
    loading,
  };
}
