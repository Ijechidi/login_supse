'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

interface TimePickerFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function TimePickerField({ 
  value, 
  onChange, 
  error 
}: TimePickerFieldProps) {
  return (
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
        className={error ? 'border-red-300 focus:ring-red-500' : ''}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">Heures de consultation: 8h00 - 18h00</p>
    </div>
  );
}