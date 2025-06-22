'use client';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Medecin {
  id: string;
  specialite: string;
  user: {
    nom: string;
    prenom: string;
  };
}

interface FormData {
  medecinId: string;
  date: string;
  heure: string;
  motif: string;
}

interface ValidationErrors {
  medecinId?: string;
  date?: string;
  heure?: string;
  motif?: string;
}

export default function PriseRendezVousPage() {
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [form, setForm] = useState<FormData>({
    medecinId: '',
    date: '',
    heure: '',
    motif: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMedecins, setIsLoadingMedecins] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  useEffect(() => {
    const loadMedecins = async () => {
      try {
        setIsLoadingMedecins(true);
        const res = await fetch('/api/medecins');
        if (!res.ok) {
          throw new Error('Erreur lors du chargement des médecins');
        }
        const data = await res.json();
        setMedecins(data);
      } catch (error) {
        console.error('Erreur:', error);
        setMessage('Erreur lors du chargement des médecins');
        setMessageType('error');
      } finally {
        setIsLoadingMedecins(false);
      }
    };

    loadMedecins();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!form.medecinId) {
      newErrors.medecinId = 'Veuillez sélectionner un médecin';
    }

    if (!form.date) {
      newErrors.date = 'Veuillez sélectionner une date';
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'La date ne peut pas être dans le passé';
      }
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
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setForm(prev => ({ ...prev, medecinId: value }));
    if (errors.medecinId) {
      setErrors(prev => ({ ...prev, medecinId: undefined }));
    }
  };

  const resetForm = () => {
    setForm({ medecinId: '', date: '', heure: '', motif: '' });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { medecinId, date, heure, motif } = form;
      const res = await fetch('/api/rendezvous/create', {
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
      console.error('Erreur:', error);
      setMessage('Erreur de connexion. Veuillez réessayer.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getSelectedMedecin = () => {
    return medecins.find(med => med.id === form.medecinId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
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
            {/* Message d'état */}
            {message && (
              <Alert className={`mb-6 ${messageType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  {messageType === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <AlertDescription className={messageType === 'success' ? 'text-green-800' : 'text-red-800'}>
                    {message}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Médecin *
                </Label>
                <Select
                  value={form.medecinId}
                  onValueChange={handleSelectChange}
                  disabled={isLoadingMedecins}
                >
                  <SelectTrigger className={`w-full ${errors.medecinId ? 'border-red-300 focus:ring-red-500' : ''}`}>
                    <SelectValue 
                      placeholder={isLoadingMedecins ? "Chargement..." : "Choisir un médecin"} 
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {medecins.map((med) => (
                      <SelectItem key={med.id} value={med.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Dr {med.user.nom} {med.user.prenom}
                          </span>
                          <span className="text-sm text-gray-500">{med.specialite}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.medecinId && (
                  <p className="text-sm text-red-600">{errors.medecinId}</p>
                )}
                {getSelectedMedecin() && (
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">
                      <strong>Médecin sélectionné:</strong> Dr {getSelectedMedecin()?.user.nom} {getSelectedMedecin()?.user.prenom}
                    </p>
                    <p className="text-sm text-gray-700">
                      Spécialité: {getSelectedMedecin()?.specialite}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    value={form.date}
                    onChange={handleChange}
                    min={getTodayDate()}
                    className={`${errors.date ? 'border-red-300 focus:ring-red-500' : ''}`}
                    required
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heure" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Heure *
                  </Label>
                  <Input
                    type="time"
                    name="heure"
                    id="heure"
                    value={form.heure}
                    onChange={handleChange}
                    min="08:00"
                    max="18:00"
                    className={`${errors.heure ? 'border-red-300 focus:ring-red-500' : ''}`}
                    required
                  />
                  {errors.heure && (
                    <p className="text-sm text-red-600">{errors.heure}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Heures de consultation: 8h00 - 18h00
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motif" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Motif de consultation *
                </Label>
                <Textarea
                  name="motif"
                  id="motif"
                  value={form.motif}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Décrivez brièvement le motif de votre consultation (ex: consultation de routine, symptômes spécifiques, suivi...)"
                  className={`resize-none ${errors.motif ? 'border-red-300 focus:ring-red-500' : ''}`}
                  required
                />
                {errors.motif && (
                  <p className="text-sm text-red-600">{errors.motif}</p>
                )}
                <p className="text-xs text-gray-500">
                  {form.motif.length}/500 caractères (minimum 10)
                </p>
              </div>

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
    </div>
  );
}
