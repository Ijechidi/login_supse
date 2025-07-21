import { getUserInfo } from '@/lib/users/getUserInfo';
import PatientList from '@/components/medecin/PatientList';
import React from 'react';
import PatientsPage from '@/components/medecin/PatientsPage';

export default async function page() {
  const user = await getUserInfo();
  if (!user) return <div>Non authentifié</div>;
  if (user.role !== 'MEDECIN') return <div>Accès réservé aux médecins</div>;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Patients</h1>
      <PatientList medecinId={user.id} />
      <PatientsPage medecinId={user.id} />
    </div>
  );
}
