import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import React from 'react';

/**
 * Champ de sélection de date pour le formulaire de rendez-vous.
 * @param {Object} props
 * @param {string} props.value - La valeur de la date sélectionnée.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Callback lors du changement de date.
 * @param {string} [props.error] - Message d'erreur éventuel.
 * @param {string} [props.min] - Date minimale sélectionnable.
 */
const DatePickerField: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: string;
}> = ({ value, onChange, error, min }) => (
  <div className="space-y-2">
    <Label htmlFor="date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <Calendar className="w-4 h-4" />
      Date *
    </Label>
    <Input
      type="date"
      name="date"
      id="date"
      value={value}
      onChange={onChange}
      min={min}
      className={`${error ? 'border-red-300 focus:ring-red-500' : ''}`}
      required
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

export default DatePickerField; 