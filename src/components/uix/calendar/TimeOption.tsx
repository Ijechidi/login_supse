import React from 'react'
import TimeSlotView from './TimeSlotView'
import { Disponibilite } from '@/types/globalTypes'
import { SlideButton } from '../tools/SlideButton3'
import { HoverSlideOverlay } from './HoverContent'
import ConfirmVisit from './ConfirmVisit'


export default function TimeOption({slot}:{slot:Disponibilite}) {
  return (
    <div>
<div className='flex justify-center border gap-4 pr-2 rounded bg-muted/50 items-center'>
    
    <TimeSlotView slot={slot} />

<ConfirmVisit href={`/rendez-vous/new-visit/${slot.id}`}  />

</div>
    </div>
  )
}
