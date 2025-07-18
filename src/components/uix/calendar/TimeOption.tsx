import React from 'react'
import TimeSlotView from './TimeSlotView'
import { Disponibilite } from '@/types/globalTypes'
import { SlideButton } from '../tools/SlideButton3'


export default function TimeOption({slot}:{slot:Disponibilite}) {
  return (
    <div>
<div className='flex justify-center border gap-4 pr-2 rounded bg-muted/50 items-center'>
    
    <TimeSlotView slot={slot} />
    <SlideButton
    // className='w-14'
      text="rendez-vous"
      completedText="visite cree"
      loadingText="validation..."
      resolveTo = "success"
      onComplete={() => console.log("Action completed!")}
      autoReset={false}
      resetDelay={250000}
      disabled
    />
</div>
    </div>
  )
}
