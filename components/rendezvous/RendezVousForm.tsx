'use client';
import { useEffect, useState } from 'react';
import AlertMessage from './AlertMessage';
import DatePickerField from './DatePickerField';
import TimePickerField from './TimePickerField';
import MotifTextareaField from './MotifTextareaField';
import SelectMedecinField from './SelectMedecinField';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useRendezVousForm } from './useRendezVousForm';

/**
 * Formulaire principal de prise de rendez-vous.
 * Gère le chargement des médecins, la soumission et l'affichage des messages.
 */
export default function RendezVousForm() {
  const [medecins, setMedecins] = useState<any[]>([]);
  const [isLoadingMedecins, setIsLoadingMedecins] = useState(true);
  const {
    form,
    errors,
    message,
    messageType,
    isLoading,
    setMessage,
    setMessageType,
    validateForm,
    handleChange,
    handleSelectChange,
    resetForm,
    setIsLoading,
  } = useRendezVousForm();

  useEffect(() => {
    const loadMedecins = async () => {
      try {
        setIsLoadingMedecins(true);
        const res = await fetch('/api/medecins');
        if (!res.ok) throw new Error('Erreur lors du chargement des médecins');
        const data = await res.json();
        setMedecins(data);
      } catch (error) {
        setMessage('Erreur lors du chargement des médecins');
        setMessageType('error');
      } finally {
        setIsLoadingMedecins(false);
      }
    };
    loadMedecins();
  }, [setMessage, setMessageType]);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const { medecinId, date, heure, motif } = form;
      const res = await fetch('/api/rendezvous/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medecinId, date, heure, motif }),
      });
      if (res.ok) {
        setMessage('Rendez-vous pris avec succès ! Vous recevrez une confirmation par email.');
        setMessageType('success');
        resetForm();
      } else {
        const errorData = await res.json().catch(() => ({ message: 'Erreur inconnue' }));
        setMessage(errorData.message || 'Une erreur est survenue lors de la prise de rendez-vous');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Erreur de connexion. Veuillez réessayer.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
            <Calendar className="w-8 h-8" />
            Prendre un rendez-vous
          </h1>
          <p className="text-gray-300 text-center mt-2">
            Planifiez votre consultation médicale en quelques clics
          </p>
        </div>
        <div className="p-8">
          <AlertMessage message={message} type={messageType} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <SelectMedecinField
              medecins={medecins}
              value={form.medecinId}
              onChange={handleSelectChange}
              error={errors.medecinId}
              isLoading={isLoadingMedecins}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePickerField
                value={form.date}
                onChange={handleChange}
                error={errors.date}
                min={getTodayDate()}
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
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Validation...
                  </div>
                ) : (
                  'Confirmer le rendez-vous'
                )}
              </Button>
            </div>
          </form>
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Votre rendez-vous sera confirmé dans les plus brefs délais.
              En cas d'urgence, contactez directement le cabinet médical ou les services d'urgence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 