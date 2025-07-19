"use client"
import { useDisponibilitesLibres } from '@/hooks/useDisponibilitesLibres'
import React from 'react'

export default function DispoWhithVisit() {
        const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46"
    const {creneauxParHeure} = useDisponibilitesLibres(medecinId)

  return (
    <div> <h1></h1> getDispoWhithVisit
{/*     
    <div>
        {JSON.stringify(creneauxParHeure, null, 2)}


    </div> */}

<h1>dipos creanua</h1>
    {creneauxParHeure.toString()}
    </div>
  )
}
