'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

interface DatePickerFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function DatePickerField({ 
  value, 
  onChange, 
  error 
}: DatePickerFieldProps) {
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  return (
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
        min={getTodayDate()}
        className={error ? 'border-red-300 focus:ring-red-500' : ''}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}