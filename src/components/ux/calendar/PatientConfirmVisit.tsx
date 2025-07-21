import React from "react"
import { HoverSlideOverlay } from "./HoverContent"


import { Statut } from "@prisma/client"
import { getPatientButtonPropsByStatut, getPatientHoverSlideOverlayPropsByStatut } from "@/components/Rendevous/rendezvous.utils"
import { SlideButton } from "@/components/tools/SlideButton"


export interface ConfirmVisitProps {
  className?: string
  href?: string
  statut?: Statut
  withHover?: boolean
  onComplete?: () => void

}


export default function PatientConfirmVisit({
  className,
  href,
  statut ,
  withHover = false,
  onComplete,
}: ConfirmVisitProps) {
  const slideButtonProps = {
    ...getPatientButtonPropsByStatut(statut),
    onComplete,
  }

  const hoverProps = getPatientHoverSlideOverlayPropsByStatut(statut)

  return (
    <HoverSlideOverlay
      withHover={hoverProps.withHover}
      text={hoverProps.text}
      href={href}
      
      className={`w-fit min-w-2 px-px h-12 rounded-md border bg-background ${className}`}
    >
      <SlideButton autoReset   {...slideButtonProps} />
    </HoverSlideOverlay>
  )
}
