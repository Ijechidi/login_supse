import React from 'react'
import { formatHeure } from '@/lib/utils';
import { Disponibilite } from '@/types/globalTypes'
import { SlideButton } from '../../tools/SlideButton';


export default function TimeSlotView({ slot }: { slot: Disponibilite}) {
  return (
    <div className='border border-l-0 p-px flex  rounded-md'>
      {slot?.heureDebut && slot?.heureFin && (

<div className='bg-muted p-4 rounded-md'>
{formatHeure(slot.heureDebut)} - {formatHeure(slot.heureFin)}
</div>

      )}

 
    </div>
  );
}