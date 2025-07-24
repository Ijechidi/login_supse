'use client'
import PatientCalendar from '@/components/patient/PatientCalendar'
import { usePatientsByMedecin } from '@/hooks/usePatientsByMedecin'
import React from 'react'

export default function page() {
    const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46"
    const { patients } = usePatientsByMedecin(medecinId)
  return (
    <div>
<pre>
  {JSON.stringify(patients, null, 2)}
</pre>
        {/* <PatientCalendar medecinId={medecinId} /> */}
    </div>
  )
}
