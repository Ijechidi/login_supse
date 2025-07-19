import { useState, useCallback } from "react";
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { 
  generateDisponibilites, 
  createSingleDisponibilite, 
  validateDisponibiliteInput 
} from "@/lib/utils/disponibilites";

interface UseAddDisponibilitesProps {
  medecinId: string;
  date: Date;
}

export function useAddDisponibilites({ medecinId, date }: UseAddDisponibilitesProps) {
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [duree, setDuree] = useState(60);
  const [isMultipleSlots, setIsMultipleSlots] = useState(false);
  const [errors, setErrors] = useState<{ debut?: string; fin?: string; duree?: string }>({});
  
  const { createDisponibilite, loading } = useDisponibilites({ medecinId });

  const validate = useCallback(() => {
    const validation = validateDisponibiliteInput({
      heureDebut,
      heureFin,
      duree,
      isMultipleSlots,
    });
    
    setErrors(validation.errors);
    return validation.isValid;
  }, [heureDebut, heureFin, duree, isMultipleSlots]);

  const handleGenerate = useCallback(() => {
    if (!validate()) return;
    
    if (isMultipleSlots) {
      // Créer plusieurs créneaux
      const slots = generateDisponibilites({
        medecinId,
        date,
        heureDebut,
        heureFin,
        dureeMinutes: duree,
      });
      
      slots.forEach(slot => {
        createDisponibilite.mutate({
          medecinId,
          heureDebut: slot.heureDebut,
          heureFin: slot.heureFin,
          meta: {},
        });
      });
    } else {
      // Créer un seul créneau
      const slot = createSingleDisponibilite({
        medecinId,
        date,
        heureDebut,
        heureFin,
      });
      
      createDisponibilite.mutate({
        medecinId,
        heureDebut: slot.heureDebut,
        heureFin: slot.heureFin,
        meta: {},
      });
    }
    
    // Reset form
    setHeureDebut("");
    setHeureFin("");
    setDuree(60);
    setIsMultipleSlots(false);
    setErrors({});
  }, [heureDebut, heureFin, duree, medecinId, date, createDisponibilite, validate, isMultipleSlots]);

  const resetForm = useCallback(() => {
    setHeureDebut("");
    setHeureFin("");
    setDuree(60);
    setIsMultipleSlots(false);
    setErrors({});
  }, []);

  const clearError = useCallback((field: 'debut' | 'fin' | 'duree') => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  return {
    // State
    heureDebut,
    heureFin,
    duree,
    isMultipleSlots,
    errors,
    loading,
    
    // Actions
    setHeureDebut,
    setHeureFin,
    setDuree,
    setIsMultipleSlots,
    handleGenerate,
    resetForm,
    clearError,
  };
} 