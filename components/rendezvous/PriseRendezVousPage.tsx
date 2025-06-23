'use client';

import { useEffect, useState } from 'react';
import RendezVousForm from './RendezVousForm';
import { getMedecins } from './actions';
import { Medecin } from '@/types/medecin';
import { Calendar } from 'lucide-react';


export default function PriseRendezVousPage() {
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [isLoadingMedecins, setIsLoadingMedecins] = useState(true);

  useEffect(() => {
    const loadMedecins = async () => {
      try {
        setIsLoadingMedecins(true);
        const data = await getMedecins();
        setMedecins(data);
      } finally {
        setIsLoadingMedecins(false);
      }
    };

    loadMedecins();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
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
          
          <RendezVousForm 
            medecins={medecins} 
            isLoadingMedecins={isLoadingMedecins} 
          />
        </div>
      </div>
    </div>
  );
}