import React from 'react'
import TimeSlotView from './TimeSlotView'
import { DisponibiliteAvecRendezVous } from '@/types/globalTypes'

import PatientConfirmVisit from './PatientConfirmVisit'
import { HoverSlideOverlay } from './HoverContent'
import { SlideButton } from '@/components/tools/SlideButton'


export default function TimeOption({slot, patientId}:{slot:DisponibiliteAvecRendezVous, patientId?:string}) {
  return (
    <div>
<div className='flex justify-center w-full border gap-4 pr-2 rounded bg-muted/50 items-center'>
    
    <TimeSlotView slot={slot}  />



{ slot.rendezVous.patientId === patientId ? (

<PatientConfirmVisit   statut={slot.rendezVous?.statut} href={`/rendez-vous/new-visit/${slot.id}`}  />
):(
  <HoverSlideOverlay text='Formulaire' href={`/rendez-vous/new-visit/${slot.id}`}>
      <SlideButton text="prendre rendez-vous" disabled />
  </HoverSlideOverlay>
)

}


</div>
    </div>
  )
}
