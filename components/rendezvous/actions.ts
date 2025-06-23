'use server';

import { Medecin } from '@/types/medecin';
import { FormData } from '@/types/rendezVous';

export async function getMedecins(): Promise<Medecin[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medecins`);
  if (!res.ok) throw new Error('Erreur lors du chargement des médecins');
  return res.json();
}

export async function createRendezVous(formData: FormData): Promise<{ message: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rendezvous/patient`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erreur lors de la prise de rendez-vous');
  }

  return res.json();
}