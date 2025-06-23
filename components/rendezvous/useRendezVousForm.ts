import { useState, useCallback } from 'react';
import { FormData, ValidationErrors } from '@/types/rendezVous';

const initialFormData: FormData = {
  medecinId: '',
  date: '',
  heure: '',
  motif: '',
};

export function useRendezVousForm() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!form.medecinId) newErrors.medecinId = 'Veuillez sélectionner un médecin';
    
    if (!form.date) {
      newErrors.date = 'Veuillez sélectionner une date';
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) newErrors.date = 'La date ne peut pas être dans le passé';
    }

    if (!form.heure) {
      newErrors.heure = 'Veuillez sélectionner une heure';
    } else {
      const [hours, minutes] = form.heure.split(':').map(Number);
      if (hours < 8 || hours > 18 || (hours === 18 && minutes > 0)) {
        newErrors.heure = 'Les heures de consultation sont de 8h à 18h';
      }
    }

    if (!form.motif.trim()) {
      newErrors.motif = 'Veuillez préciser le motif de consultation';
    } else if (form.motif.trim().length < 10) {
      newErrors.motif = 'Le motif doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSelectChange = useCallback((value: string) => {
    setForm(prev => ({ ...prev, medecinId: value }));
    if (errors.medecinId) {
      setErrors(prev => ({ ...prev, medecinId: undefined }));
    }
  }, [errors]);

  const resetForm = useCallback(() => {
    setForm(initialFormData);
    setErrors({});
  }, []);

  return {
    form,
    errors,
    isLoading,
    setIsLoading,
    handleChange,
    handleSelectChange,
    resetForm,
    validateForm
  };
}