'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface Medecin {
  id: string;
  specialite: string;
  user: {
    nom: string;
    prenom: string;
  };
}

interface SelectMedecinProps {
  medecins: Medecin[];
  value: string;
  onChange: (value: string) => void;
  errors?: string;
  isLoading?: boolean;
}

export default function SelectMedecin({
  medecins,
  value,
  onChange,
  errors,
  isLoading = false,
}: SelectMedecinProps) {
  const selectedMedecin = medecins.find((med) => med.id === value);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <User className="w-4 h-4" />
        Médecin *
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={isLoading}
      >
        <SelectTrigger className={`w-full ${errors ? 'border-red-300 focus:ring-red-500' : ''}`}>
          <SelectValue placeholder={isLoading ? 'Chargement...' : 'Choisir un médecin'} />
        </SelectTrigger>
        <SelectContent>
          {medecins.map((med) => (
            <SelectItem key={med.id} value={med.id}>
              <div className="flex flex-col">
                <span className="font-medium">
                  Dr {med.user.nom} {med.user.prenom}
                </span>
                <span className="text-sm text-gray-500">{med.specialite}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors && (
        <p className="text-sm text-red-600">{errors}</p>
      )}
      {selectedMedecin && (
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-800">
            <strong>Médecin sélectionné:</strong> Dr {selectedMedecin.user.nom} {selectedMedecin.user.prenom}
          </p>
          <p className="text-sm text-gray-700">
            Spécialité: {selectedMedecin.specialite}
          </p>
        </div>
      )}
    </div>
  );
}
