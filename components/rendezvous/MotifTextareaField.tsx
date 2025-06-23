'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface MotifTextareaFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export default function MotifTextareaField({ 
  value, 
  onChange, 
  error 
}: MotifTextareaFieldProps) {
  return (
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
        placeholder="Décrivez le motif de votre consultation"
        className={`resize-none ${error ? 'border-red-300 focus:ring-red-500' : ''}`}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">{value.length}/500 caractères (minimum 10)</p>
    </div>
  );
}