// RendezVousStatistics.tsx
import React from 'react';
import { RendezVous, Statut } from './types';

interface RendezVousStatisticsProps {
  rendezVous: RendezVous[];
}

const RendezVousStatistics: React.FC<RendezVousStatisticsProps> = ({ rendezVous }) => {
  const confirmes = rendezVous.filter(rdv => rdv.statut === Statut.confirme).length;
  const enAttente = rendezVous.filter(rdv => rdv.statut === Statut.en_attente).length;
  const termines = rendezVous.filter(rdv => rdv.statut === Statut.termine).length;
  const total = rendezVous.length;

  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">
          {confirmes}
        </div>
        <div className="text-sm text-blue-600">Confirmés</div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-yellow-600">
          {enAttente}
        </div>
        <div className="text-sm text-yellow-600">En attente</div>
      </div>
      <div className="bg-green-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-green-600">
          {termines}
        </div>
        <div className="text-sm text-green-600">Terminés</div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-gray-600">
          {total}
        </div>
        <div className="text-sm text-gray-600">Total</div>
      </div>
    </div>
  );
};

export default RendezVousStatistics;