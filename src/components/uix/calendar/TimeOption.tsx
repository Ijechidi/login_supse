import React from 'react'
import TimeSlotView from './TimeSlotView'
import { Disponibilite } from '@/types/globalTypes'
import { SlideButton } from '../tools/SlideButton3'
import { HoverSlideOverlay } from './HoverContent'


export default function TimeOption({slot}:{slot:Disponibilite}) {
  return (
    <div>
<div className='flex justify-center border gap-4 pr-2 rounded bg-muted/50 items-center'>
    
    <TimeSlotView slot={slot} />


<HoverSlideOverlay  text="formulaire" href={`/rendez-vous/new-visit/${slot.id}`} className="w-fit min-w-2 px-px h-12 rounded-md border bg-background">
 
 <SlideButton
       text="rendez-vous"
       completedText="visite cree"
       loadingText="validation..."
       resolveTo = "success"
       onComplete={() => console.log("Action completed!")}
       autoReset={false}
       resetDelay={250000}
       disabled
 />
</HoverSlideOverlay>
</div>
    </div>
  )
}
