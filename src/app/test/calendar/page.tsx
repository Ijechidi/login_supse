import { CalendarPlanning } from '@/components/ux/CalendarPlanning'
import InteractiveCalendar from '@/components/visualize-booking'
import PlanningCalendar from '@/components/ux/PlanningCalendar'
import React from 'react'
import { mockRendezVous } from '@/data/mockRendezVous'
import { PatientVisitCalendar } from '@/components/ux/PatientVisitCalendar'

export default function page() {
  return (
    <div>

      <InteractiveCalendar/>
  <PatientVisitCalendar/>
    </div>
  )
}
