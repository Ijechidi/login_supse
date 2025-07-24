import { getUserInfo } from '@/lib/users/getUserInfo';
import PatientList from '@/components/medecin/PatientList';
import React from 'react';
import PatientsPage from '@/components/medecin/PatientsPage';
import PatientsCircle from '@/components/medecin/PatientsCircle';

import CircularAvatars from '@/components/medecin/patients/AvatarCircle';
import { getPatientsByMedecinId } from '@/lib/actions/medecins';
import { PatientInfo } from '@/components/medecin/patients/PatientInfo';
import PatienInfoGrid from '@/components/medecin/patients/PatienInfoGrid';

export default async function page() {
  const user = await getUserInfo();
  const patients = await getPatientsByMedecinId(user.id);
  if (!user) return <div>Non authentifié</div>;
  if (user.role !== 'MEDECIN') return <div>Accès réservé aux médecins</div>;

  // Mapping des patients pour CircularAvatars
  const AvatarPatients = patients.map((pm: any) => ({
    id: pm.patient.id,
    src: pm.patient.user?.avatarUrl,
    fallback: `${pm.patient.user?.prenom?.[0] ?? ''}${pm.patient.user?.nom?.[0] ?? ''}`,
    tooltip: `${pm.patient.user?.prenom} ${pm.patient.user?.nom}`,
  }));


  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Patients</h1>
      {/* <PatientList medecinId={user.id} /> */}
{/* <div className='flex md:flex-row flex-col gap-8 md:gap-0 border'>

  
  <CircularAvatars users={AvatarPatients}/>
</div> */}
<PatienInfoGrid medecinId={user.id}/>
    
      <PatientsPage medecinId={user.id} />
    </div>
  );
}
