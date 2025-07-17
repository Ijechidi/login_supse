import { getDisponibilitesByMedecin } from '@/app/actions/disponibilite'
import TimeSlotView from '@/components/uix/calendar/TimeSlotView'
import { AddDisponibiliteForm } from '@/components/uix/AddDisponibiliteForm'
import React from 'react'

export default async function Page() {
  const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46"
  const disponibilites = await getDisponibilitesByMedecin(medecinId)

  return (
    <div className="p-4 flex flex-col w-full ">





<div>
  <h1 className='text-center'>Ajout de disponibiliter : ok</h1>
  <AddDisponibiliteForm medecinId={medecinId} />
</div>




        <div className='flex flex-col'>

          <h1 className='text-center'>Structure Json</h1>

          {disponibilites && <pre>
            {JSON.stringify(disponibilites, null, 2)}
          </pre> }
                {disponibilites?.map((disponibilite) => (
          <div key={disponibilite.id}>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              {new Date(disponibilite.heureDebut).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - {new Date(disponibilite.heureFin).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </pre>
          </div>
                ))}
        </div>


      <div>
                  <h1 className='text-center'> Format Heure</h1>
        {disponibilites && <TimeSlotView slot={disponibilites[0]} /> }
 
      </div>
    </div>
  )
}
