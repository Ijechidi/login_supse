"use client"

import React from 'react'
import PlanningCalendar from '@/components/ux/PlanningCalendar'
import { mockRendezVous } from '@/data/mockRendezVous'

export default function TestPlanningCalendar() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Test Planning Calendar</h1>
      <PlanningCalendar 
        rendezVous={mockRendezVous}
        onDateSelect={(date) => {
          console.log('Date sélectionnée:', date)
        }}
      />
    </div>
  )
} 