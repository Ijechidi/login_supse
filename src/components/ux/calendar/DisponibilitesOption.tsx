import React from 'react'
import TimeSlotView from './TimeSlotView'
import { DisponibiliteWithRendezVous } from '@/types/types'
import { Button } from '@/components/ui/button'
import {  Trash2, User } from 'lucide-react'
import Link from 'next/link'
import ConfirmVisit from './ConfirmVisit'
import VisitPatient from '@/components/medecin/VisitPatient'
import { getButtonPropsByStatut, getHoverSlideOverlayPropsByStatut } from '../../rendez-vous/rendezvous.utils'

export interface DisponibiliteOptionProps {
  disponibilites: DisponibiliteWithRendezVous[]
  patients:[]
  onDelete: (id: string) => void
  onUpdateRendezVousStatus: (rendezVousId: string, statut: string) => void
}
export default function DisponibilitesOption({disponibilites,onDelete, patients, onUpdateRendezVousStatus}:DisponibiliteOptionProps) {
  return (
    <div className='flex w-full flex-col items-center  gap-4  rounded  '>
{
disponibilites.map((slot)=>(
    <div className='flex justify-center items-center bg-muted/50 pr-2 border w-full rounded'>
    <TimeSlotView key={slot.id} slot={slot}  /> 

    <div className='flex gap-3 mx-4 items-center'>
        {/* Affichage du patient si rendez-vous */}
        {slot.rendezVous && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <User className="w-4 h-4" />
            <span>{slot.rendezVous.patient?.user?.nom && slot.rendezVous.patient?.user?.prenom
              ? `${slot.rendezVous.patient.user.prenom} ${slot.rendezVous.patient.user.nom}`
              : 'Patient inconnu'}</span>
          </div>
        )}
        <VisitPatient patients={[]} />
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
      {/* Bouton d'action sur le rendez-vous */}
      <ConfirmVisit
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
  ))
}
   
    </div>
  )
}
