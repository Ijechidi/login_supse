// RendezVousCard.tsx
import React from 'react';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { RendezVous, Statut } from './types';
import { formatDate, formatHeure, getStatutColor, getStatutText } from './utils';

interface RendezVousCardProps {
  rendezVous: RendezVous;
  onViewDetails: (rendezVousId: string) => void;
  onCancel: (rendezVousId: string) => void;
}

const RendezVousCard: React.FC<RendezVousCardProps> = ({
  rendezVous,
  onViewDetails,
  onCancel
}) => {
  const handleViewDetails = () => {
    onViewDetails(rendezVous.id);
  };

  const handleCancel = () => {
    onCancel(rendezVous.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: rendezVous.type.couleur || '#6b7280' }}
            />
            <span className="font-medium text-gray-900">
              {rendezVous.type.nom}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatutColor(rendezVous.statut)}`}
            >
              {getStatutText(rendezVous.statut)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(rendezVous.dateDebut)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {formatHeure(rendezVous.dateDebut)}
                {rendezVous.dateFin && ` - ${formatHeure(rendezVous.dateFin)}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>
                {rendezVous.medecin.user.prenom} {rendezVous.medecin.user.nom}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-4 h-4" />
              <span className="text-sm">{rendezVous.medecin.specialite}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Motif:</span> {rendezVous.motif}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            onClick={handleViewDetails}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Voir détails
          </button>
          {rendezVous.statut === Statut.confirme && (
            <button 
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RendezVousCard;