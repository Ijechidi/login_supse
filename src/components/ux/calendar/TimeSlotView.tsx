import React from 'react'
import { formatHeure } from '@/lib/utils';
import { Disponibilite } from '@/types/globalTypes'
import { SlideButton } from '../../tools/SlideButton';


export default function TimeSlotView({ slot }: { slot: Disponibilite}) {
  return (
    <div className='border border-l-0  p-px flex h-full  rounded-md'>
      {slot?.heureDebut && slot?.heureFin && (

<div className='bg-muted p-2 md:p-4 flex items-center w-24 text-[10px]  md:text-base md:w-40 rounded-md'>
{formatHeure(slot.heureDebut)} - {formatHeure(slot.heureFin)}
</div>

      )}

 
    </div>
  );
}