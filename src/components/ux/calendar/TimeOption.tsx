import React from 'react'
import TimeSlotView from './TimeSlotView'
import { DisponibiliteAvecRendezVous } from '@/types/globalTypes'

import ConfirmVisit from './ConfirmVisit'
import PatientConfirmVisit from './PatientConfirmVisit'


export default function TimeOption({slot}:{slot:DisponibiliteAvecRendezVous}) {
  return (
    <div>
<div className='flex justify-center w-full border gap-4 pr-2 rounded bg-muted/50 items-center'>
    
    <TimeSlotView slot={slot}  />


<PatientConfirmVisit   statut={slot.rendezVous?.statut} href={`/rendez-vous/new-visit/${slot.id}`}  />


</div>
    </div>
  )
}
