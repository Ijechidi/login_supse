import React from 'react'
import { formatHeure } from '@/lib/utils';
import { Disponibilite } from '@/types/globalTypes'


export default function TimeSlotView({ slot }: { slot: Disponibilite}) {
  return (
    <div>
      {slot?.heureDebut && slot?.heureFin && (

<div>
{formatHeure(slot.heureDebut)} - {formatHeure(slot.heureFin)}
</div>

      )}
 
    </div>
  );
}