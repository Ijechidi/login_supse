'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import PatientFilterList from './PatientFilterList';

// Définition de l'interface Patient pour le typage
interface Patient {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  avatarUrl?: string;
  age?: number;
  telephone?: string;
  adresse?: string;
  dateNaissance?: string;
  suiviDepuis?: string;
}

interface PatientSearchProps {
  initialPatients: Patient[];
}

export default function PatientSearch({ initialPatients }: PatientSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    // Utilisation de `replace` pour ne pas ajouter d'entrée dans l'historique de navigation
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredPatients = useMemo(() => {
    if (!query) return initialPatients;
    
    const lowercasedQuery = query.toLowerCase();
    
    return initialPatients.filter(patient => 
      (patient.nom?.toLowerCase().includes(lowercasedQuery)) ||
      (patient.prenom?.toLowerCase().includes(lowercasedQuery)) ||
      (patient.email?.toLowerCase().includes(lowercasedQuery))
    );
  }, [query, initialPatients]);

  return (
    <>
      <div className="bg-card border rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Rechercher par nom, prénom ou email..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>
          {/* Les autres filtres (tri, âge) peuvent être ajoutés ici */}
        </div>
      </div>

      <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-muted/50">
          <h2 className="text-xl font-semibold text-foreground">Liste des Patients</h2>
        </div>
        <div className="divide-y divide-border">
          <PatientFilterList patients={filteredPatients} />
        </div>
      </div>
    </>
  );
} 