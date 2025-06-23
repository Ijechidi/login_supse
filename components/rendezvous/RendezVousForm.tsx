'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectMedecin from '@/components/medecin/SelectMedecin';
import DatePickerField from './DatePickerField';
import TimePickerField from './TimePickerField';
import MotifTextareaField from './MotifTextareaField';
import AlertMessage from './AlertMessage';
import { useRendezVousForm } from './useRendezVousForm';
import { createRendezVous } from './actions';
import { Medecin } from '@/types/medecin';

interface RendezVousFormProps {
  medecins: Medecin[];
  isLoadingMedecins: boolean;
}

export default function RendezVousForm({ 
  medecins, 
  isLoadingMedecins 
}: RendezVousFormProps) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  
  const {
    form,
    errors,
    isLoading,
    handleChange,
    handleSelectChange,
    resetForm,
    validateForm
  } = useRendezVousForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) return;

    try {
      const result = await createRendezVous(form);
      setMessage(result.message);
      setMessageType('success');
      resetForm();
    } catch (error: any) {
      setMessage(error.message || 'Erreur de connexion');
      setMessageType('error');
    }
  };

  return (
    <div className="p-8">
      {message && <AlertMessage message={message} type={messageType} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SelectMedecin
          medecins={medecins}
          value={form.medecinId}
          onChange={handleSelectChange}
          errors={errors.medecinId}
          isLoading={isLoadingMedecins}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerField 
            value={form.date} 
            onChange={handleChange} 
            error={errors.date} 
          />
          <TimePickerField 
            value={form.heure} 
            onChange={handleChange} 
            error={errors.heure} 
          />
        </div>

        <MotifTextareaField 
          value={form.motif} 
          onChange={handleChange} 
          error={errors.motif} 
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className="flex-1"
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-black hover:bg-gray-800"
            disabled={isLoading || isLoadingMedecins}
          >
            {isLoading ? 'Validation...' : 'Confirmer le rendez-vous'}
          </Button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Votre rendez-vous sera confirmé dans les plus brefs délais.
          En cas d'urgence, contactez directement le cabinet médical.
        </p>
      </div>
    </div>
  );
}