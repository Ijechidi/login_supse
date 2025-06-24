import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import React from 'react';

/**
 * Champ de texte pour le motif de consultation.
 * @param {Object} props
 * @param {string} props.value - Le texte du motif.
 * @param {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} props.onChange - Callback lors du changement de texte.
 * @param {string} [props.error] - Message d'erreur éventuel.
 */
const MotifTextareaField: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}> = ({ value, onChange, error }) => (
  <div className="space-y-2">
    <Label htmlFor="motif" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <FileText className="w-4 h-4" />
      Motif de consultation *
    </Label>
    <Textarea
      name="motif"
      id="motif"
      value={value}
      onChange={onChange}
      rows={4}
      placeholder="Décrivez brièvement le motif de votre consultation (ex: consultation de routine, symptômes spécifiques, suivi...)"
      className={`resize-none ${error ? 'border-red-300 focus:ring-red-500' : ''}`}
      required
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
    <p className="text-xs text-gray-500">{value.length}/500 caractères (minimum 10)</p>
  </div>
);

export default MotifTextareaField; 