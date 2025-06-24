import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';
import React from 'react';

/**
 * Champ de sélection d'heure pour le formulaire de rendez-vous.
 * @param {Object} props
 * @param {string} props.value - L'heure sélectionnée.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Callback lors du changement d'heure.
 * @param {string} [props.error] - Message d'erreur éventuel.
 */
const TimePickerField: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}> = ({ value, onChange, error }) => (
  <div className="space-y-2">
    <Label htmlFor="heure" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <Clock className="w-4 h-4" />
      Heure *
    </Label>
    <Input
      type="time"
      name="heure"
      id="heure"
      value={value}
      onChange={onChange}
      min="08:00"
      max="18:00"
      className={`${error ? 'border-red-300 focus:ring-red-500' : ''}`}
      required
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
    <p className="text-xs text-gray-500">Heures de consultation: 8h00 - 18h00</p>
  </div>
);

export default TimePickerField; 