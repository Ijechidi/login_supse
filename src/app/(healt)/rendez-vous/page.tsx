"use client"
import { PatientRendezVous } from '@/components/rendezvous/PatientRendezVous'
import Link from 'next/link'
import React from 'react'


export default function page() {
  return (
    <div>
      <PatientRendezVous 
  patientId="patient-1"
  onViewDetails={() => {}}
  onCancel={() => {}}
/>

<Link href="/rendez-vous/new-visit/123" className="underline text-blue-600">Modifier mon profil</Link>
<Link href="/rendez-vous/new-visit/bf522864-3dc5-492f-b92f-d04e7a284704" className="underline text-green-600 block mt-4">Ouvrir le modal de rendez-vous</Link>

{/* 

medecin rendevous 

*/}
    </div>
  )
}
