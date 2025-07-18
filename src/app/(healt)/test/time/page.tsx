"use client"

import { HoverSlideOverlay } from '@/components/uix/calendar/HoverContent'
import {  HoverSlideOverlay as HoverSlideOverlay1 } from '@/components/uix/calendar/HoverContent1'
import TimeOption from '@/components/uix/calendar/TimeOption'
import { SlideButton } from '@/components/uix/tools/SlideButton3'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex justify-center w-full'>


        <div className='w-fit'>
            <TimeOption slot={{heureDebut: new Date() , heureFin: new Date(new Date().setHours(9,0,0,0)), id:"1" , medecinId:"2", status:'LIBRE'}} />
            <HoverSlideOverlay1 text="Retour" className="w-full h-12 rounded-md border bg-background">
 
  <span className='w-42'> <ArrowLeft className="opacity-80 " size={20} /></span>
</HoverSlideOverlay1>
<HoverSlideOverlay  text="Retour" href='/rendez-vous/new-visit/123' className="w-fit min-w-2 h-12 rounded-md border bg-background">
 
  <SlideButton/>
</HoverSlideOverlay>

<Link href="/rendez-vous/new-visit/123" scroll={false} className="text-primary font-semibold">Visite</Link>


<Link
          href="./new-visit/123" scroll={false}
          className="text-primary font-semibold hover:underline" >visite</Link>
        </div>
    </div>
  )
}


/* 

          <HoverContent
      primaryContent="achetter"
      hoverContent={<ArrowLeft className="opacity-70" size={16} />}
      showContent={false} // protege <ArrowLeft className="opacity-70" size={16} /> quand on le survole
    />


         <HoverContent
      primaryContent="achetter"
      hoverContent={<ArrowLeft className="opacity-70" size={16} />}
      showContent={true} // ne  s affiche plus laisse le comportement normale de <ArrowLeft className="opacity-70" size={16} />
    />
*/