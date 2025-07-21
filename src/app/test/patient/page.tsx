import PatientCalendar from '@/components/patient/PatientCalendar'
import React from 'react'

export default function page() {
    const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46"
  return (
    <div>

        <PatientCalendar medecinId={medecinId} />
    </div>
  )
}
