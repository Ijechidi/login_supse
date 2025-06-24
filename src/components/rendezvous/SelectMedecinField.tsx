import MedecinSelect from '@/components/selects/MedecinSelect';
import React from 'react';

/**
 * Champ de sélection de médecin pour le formulaire de rendez-vous.
 * Utilise le composant MedecinSelect.
 * @param {Object} props
 * @param {Array} props.medecins - Liste des médecins.
 * @param {string} props.value - ID du médecin sélectionné.
 * @param {(value: string) => void} props.onChange - Callback lors du changement de médecin.
 * @param {string} [props.error] - Message d'erreur éventuel.
 * @param {boolean} [props.isLoading] - Indique si la liste est en cours de chargement.
 */
const SelectMedecinField: React.FC<{
  medecins: any[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isLoading?: boolean;
}> = ({ medecins, value, onChange, error, isLoading }) => (
  <div className="mb-4">
    <MedecinSelect
      medecins={medecins}
      onChange={onChange}
      defaultValue={value}
      placeholder={isLoading ? 'Chargement...' : 'Sélectionner un médecin'}
    />
    {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
  </div>
);

export default SelectMedecinField; 