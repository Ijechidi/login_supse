import React from 'react'
import { HoverSlideOverlay } from './HoverContent'
import { SlideButton } from '../tools/SlideButton3'

interface ConfirmVisitProps {
    className?: string;
    href?: string; 
  }

export default function ConfirmVisit ({ className,href}:ConfirmVisitProps) {
  return (
        <HoverSlideOverlay  text="formulaire" href={href} className="w-fit min-w-2 px-px h-12 rounded-md border bg-background">
 
 <SlideButton
       text="rendez-vous"
       completedText="visite cree"
       loadingText="validation..."
       resolveTo = "success"
       onComplete={() => console.log("Action completed!")}
       autoReset={false}
       resetDelay={250000}
       disabled
 />
</HoverSlideOverlay>
  )
}
