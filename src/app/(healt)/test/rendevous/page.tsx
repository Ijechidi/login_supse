import { getAllRendezvousByMedecinId } from '@/app/actions/rendezvous'
import { AddRendezVousForm } from '@/components/uix/Rendevous/AddRendezVousForm'
import { getAuthUser } from '@/lib/users/getUser'
import React from 'react'

export  default async function page() {
      const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46"
const rendezVous = await getAllRendezvousByMedecinId({medecinId})
      const user = await getAuthUser()

      if (!user || !user.id) {
        return <div> not user</div>        
      }
      
  return (
    <div className='flex flex-col w-full'>
            <h1>form add rendevous :ok</h1>
        <div>
<AddRendezVousForm patientId={user.id!} medecinId={medecinId} />
        </div>

     <div>
      <h2 className='text-center'>rendez-vous</h2>
{rendezVous?.map((rendezVou)=>(
  <pre>
    {JSON.stringify(rendezVou, null, 2)}
  </pre>
))}

     </div>
    </div>
  )
}
