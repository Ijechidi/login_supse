import DispoWhithVisit from '@/components/hook-test/getDispoWhithVisit';
import MedecinCalendar from '@/components/medecin/MedecinCalendar';
import {getAllDisponibilites, getDisponibilitesWithRendezVous} from '@/lib/actions/disponibilite';
import React from 'react'

export default async function page() {
    
    const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46"
    const disponibilites = await getAllDisponibilites();
    const dispoWithRendezVous = await getDisponibilitesWithRendezVous(medecinId);
  return (
    <div className='flex h-full gap-8 overflow-auto flex-col justify-center items-center'>
        <div>
            <MedecinCalendar/>
        </div>
       {disponibilites?.map((disponibilite)=>(
        <div className='flex gap-4 flex-col'>
            <h1>{disponibilite.heureDebut.toDateString()} - {disponibilite.heureFin.toDateString()}</h1>
            <h1>{disponibilite.medecinId}</h1>
        </div>
       )) }
        

        <div className='flex gap-4 flex-col'>
            <pre>{JSON.stringify(disponibilites ,null, 10)}</pre>
            
        </div>
        
            <h1>rendez-vous + disponibilité</h1>
        <div>
            <pre>{JSON.stringify(dispoWithRendezVous, null, 2)}</pre>
        </div>

        <DispoWhithVisit/>
    </div>
  )
}
