import { useState } from 'react';

export interface FormData {
  medecinId: string;
  date: string;
  heure: string;
  motif: string;
}

export interface ValidationErrors {
  medecinId?: string;
  date?: string;
  heure?: string;
  motif?: string;
}

/**
 * Hook personnalisé pour la gestion du formulaire de prise de rendez-vous.
 * Fournit l'état du formulaire, la validation, la soumission et les messages d'erreur.
 */
export function useRendezVousForm() {
  const [form, setForm] = useState<FormData>({
    medecinId: '',
    date: '',
    heure: '',
    motif: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, medecinId: value }));
    if (errors.medecinId) {
      setErrors((prev) => ({ ...prev, medecinId: undefined }));
    }
  };

  const resetForm = () => {
    setForm({ medecinId: '', date: '', heure: '', motif: '' });
    setErrors({});
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    message,
    setMessage,
    messageType,
    setMessageType,
    isLoading,
    setIsLoading,
    validateForm,
    handleChange,
    handleSelectChange,
    resetForm,
  };
} 