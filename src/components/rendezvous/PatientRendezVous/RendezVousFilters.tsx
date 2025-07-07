// RendezVousFilters.tsx
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Statut } from './types';

interface RendezVousFiltersProps {
  recherche: string;
  setRecherche: (recherche: string) => void;
  filtreStatut: Statut | 'tous';
  setFiltreStatut: (statut: Statut | 'tous') => void;
}

const RendezVousFilters: React.FC<RendezVousFiltersProps> = ({
  recherche,
  setRecherche,
  filtreStatut,
  setFiltreStatut
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Rechercher par motif, médecin ou spécialité..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Filter className="text-gray-400 w-4 h-4" />
        <select
          title="Filtrer par statut"
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value as Statut | 'tous')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les statuts</option>
          <option value={Statut.confirme}>Confirmés</option>
          <option value={Statut.en_attente}>En attente</option>
          <option value={Statut.termine}>Terminés</option>
          <option value={Statut.annule}>Annulés</option>
        </select>
      </div>
    </div>
  );
};

export default RendezVousFilters;