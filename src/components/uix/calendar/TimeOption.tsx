import React from 'react'
import TimeSlotView from './TimeSlotView'
import { Disponibilite } from '@/types/globalTypes'

export default function TimeOption({slot}:{slot:Disponibilite}) {
  return (
    <div>

<TimeSlotView slot={slot} />  
    </div>
  )
}
