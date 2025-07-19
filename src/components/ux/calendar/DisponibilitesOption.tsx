import React from 'react'
import TimeSlotView from './TimeSlotView'
import { Disponibilite } from '@/types/globalTypes'
import { Button } from '@/components/ui/button'
import {  Trash2, User } from 'lucide-react'
import Link from 'next/link'

export interface DisponibiliteOptionProps {
  disponibilites: Disponibilite[]
  onDelete: (id: string) => void
}
export default function DisponibilitesOption({disponibilites,onDelete}:DisponibiliteOptionProps) {
  return (
    <div className='flex w-full flex-col items-center gap-2'>
{
disponibilites.map((slot)=>(
    <div className='flex justify-center items-center  border w-fit  rounded'>
    <TimeSlotView key={slot.id} slot={slot}  /> 

    <div className='flex gap-3 mx-4'>

<Link href={"#"} className='border flex items-center justify-center p-2 rounded'>
<User className="h-4 w-4" />
</Link>
      <Button
      className=''
      variant="destructive"
      size="icon"
      onClick={() => onDelete(slot.id)}
        >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Supprimer</span>
        </Button>
    </div>
  </div>
  ))
}
   
    </div>
  )
}
