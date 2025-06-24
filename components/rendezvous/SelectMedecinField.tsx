import SelectMedecin from '@/components/medecin/SelectMedecin';
import React from 'react';

/**
 * Champ de sélection de médecin pour le formulaire de rendez-vous.
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
    <SelectMedecin
      medecins={medecins}
      value={value}
      onChange={onChange}
      errors={error}
      isLoading={isLoading}
    />
  </div>
);

export default SelectMedecinField; 