import React from "react"
import { HoverSlideOverlay } from "./HoverContent"
import { SlideButton } from "../../tools/SlideButton"

import { Statut } from "@prisma/client"
import { getButtonPropsByStatut, getHoverSlideOverlayPropsByStatut } from "../../rendez-vous/rendezvous.utils"


export interface ConfirmVisitProps {
  className?: string
  href?: string
  statut?: Statut
  withHover?: boolean
  onComplete?: () => void
}


export default function ConfirmVisit({
  className,
  href,
  statut ,
  withHover = true,
  onComplete,
}: ConfirmVisitProps) {
  const slideButtonProps = {
    ...getButtonPropsByStatut(statut),
    onComplete,
  }

  const hoverProps = getHoverSlideOverlayPropsByStatut(statut)

  return (
    <HoverSlideOverlay
      withHover={hoverProps.withHover}
      text={hoverProps.text}
      href={href}
      
      className={`w-fit min-w-2 px-px h-12 rounded-md border bg-background ${className}`}
    >
      <SlideButton {...slideButtonProps} />
    </HoverSlideOverlay>
  )
}
