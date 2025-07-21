import React from 'react'
import TimeSlotView from './TimeSlotView'
import { DisponibiliteWithRendezVous } from '@/types/types'
import { Button } from '@/components/ui/button'
import {  Trash2, User } from 'lucide-react'
import ConfirmVisit from './ConfirmVisit'

import { getHoverSlideOverlayPropsByStatut } from '../../rendez-vous/rendezvous.utils'
import { Statut } from '@prisma/client'
import PatientAdd from '@/components/medecin/PatientAdd'


export interface DisponibiliteOptionProps {
  disponibilites: DisponibiliteWithRendezVous[]
  onDelete: (id: string) => void
  onUpdateRendezVousStatus: (rendezVousId: string, statut: Statut) => void
}

export default function DisponibilitesOption({disponibilites,onDelete, onUpdateRendezVousStatus}:DisponibiliteOptionProps) {
  return (
    <div className='flex w-full flex-col items-center  h-[475px] p-2  border overflow-y-scroll scrollbar-hidden  gap-4  rounded  '>
{


disponibilites.map((slot)=>(

  
    <div className='flex justify-between items-center bg-muted/50 pr-2 border w-full rounded'>
    <TimeSlotView key={slot.id} slot={slot}  /> 

    <div className='flex gap-3 mx-4 items-center'>
        {/* Affichage du patient si rendez-vous */}


        <Button
        key={slot.id}
          className=''
          variant="destructive"
          size="icon"
          onClick={() => onDelete(slot.id)}
          disabled={!!slot.rendezVous}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Supprimer</span>
        </Button>
      </div>

      <div className='flex gap-2  items-center'>
        <PatientAdd medecinId={slot.medecinId} patientId={slot.rendezVous?.patientId|| undefined} disponibiliteId={slot.id} />
        {/* Bouton d'action sur le rendez-vous */}
        <ConfirmVisit
                key={slot.id}
          statut={slot.rendezVous?.statut}
          onComplete={() => {
            if (slot.rendezVous?.id) {
              if (slot.rendezVous.statut === 'EN_ATTENTE') {
                onUpdateRendezVousStatus(slot.rendezVous.id, 'CONFIRME');
              } else if (slot.rendezVous.statut === 'CONFIRME') {
                onUpdateRendezVousStatus(slot.rendezVous.id, 'ANNULE');
              }
            }
          }}
          withHover={getHoverSlideOverlayPropsByStatut(slot.rendezVous?.statut).withHover}
        />

      </div>
    </div>
  ))
}
   
    </div>
  )
}
