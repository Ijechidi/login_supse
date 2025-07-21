"use client"
import PatientCalendar from '@/components/patient/PatientCalendar'
import { SlideButton } from '@/components/tools/SlideButton'
import { HoverSlideOverlay } from '@/components/ux/calendar/HoverContent'

import React from 'react'

export default function page() {
  return (
    <div className='flex h-full gap-8 overflow-auto flex-col justify-center items-center'>
            <div className="flex flex-col gap-4">
                <h1> Button de Confirmation </h1>
                <SlideButton
                color='red'
    text="annuler"
    status='error'
       successText= "Visite confirmer"
       loadingText="validation..."
       resolveTo = "success"
       errorText='annuler'
       onComplete={() => console.log("Action completed!")}
       autoReset={false}
       resetDelay={250000}
    
 />
            </div>

            <div className="flex flex-col gap-4">
                <h1> Button de Confirmation </h1>
             
                <HoverSlideOverlay  text="Rendez-vous Terminer" href='/rendez-vous/new-visit/123' className="w-fit min-w-2 h-12 rounded-md border bg-background">
                
                <SlideButton     
                
                text="rendez-vous"
       successText= "Visite confirmer"
       loadingText="validation..."
       resolveTo = "success"
       onComplete={() => console.log("Action completed!")}
       autoReset={false}
       resetDelay={250000}
       />
                </HoverSlideOverlay>
            </div>



        <div>
           <h1>calendar</h1> 

           <div>
            <PatientCalendar medecinId="c2b36c2b-2b52-42fe-92f0-b55295f0fd46"/>
           </div>
        </div>
    </div>
  )
}
