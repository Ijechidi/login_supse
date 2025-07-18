import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TypeRendezVousEnum } from "@/types/rendezVous";
import { Statut } from "@/types/types";
import { useRendezVous } from "./useRendezVous";




export function useRendezVousForm(medecinId: string, patientId: string) {
  const { create, loading } = useRendezVous(medecinId);
  const { toast } = useToast();

  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [motif, setMotif] = useState("");
  const [type, setType] = useState<TypeRendezVousEnum>(TypeRendezVousEnum.CONSULTATION);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await create({
        medecinId,
        patientId,
        dateDebut: new Date(dateDebut),
        dateFin: dateFin ? new Date(dateFin) : undefined,
        motif,
        type,
        statut: Statut.en_attente,
      });
      toast({ title: "Rendez-vous créé", description: "Le rendez-vous a bien été enregistré." });

      // reset form
      setDateDebut("");
      setDateFin("");
      setMotif("");
      setType(TypeRendezVousEnum.CONSULTATION);
    } catch (err) {
      toast({ title: "Erreur", description: "Impossible de créer le rendez-vous.", variant: "destructive" });
      console.error(err);
    }
  };

  return {
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    motif,
    setMotif,
    type,
    setType,
    handleSubmit,
    loading,
  };
}
