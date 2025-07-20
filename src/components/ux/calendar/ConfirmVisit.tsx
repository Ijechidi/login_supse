import React from "react"
import { HoverSlideOverlay } from "./HoverContent"
import { SlideButton } from "../../tools/SlideButton"

import { Statut } from "@prisma/client"
import { getConfirmVisitPropsByStatut } from '../../rendez-vous/rendezvous.utils'


export interface ConfirmVisitProps {
  className?: string
  href?: string
  statut?: Statut
  withHover?: boolean
  onComplete?: () => void
  id?: string // nouvel id de la disponibilité
}

export default function ConfirmVisit({
  className,
  href,
  statut ,
  withHover = true,
  onComplete,
  id,
}: ConfirmVisitProps) {
  // Utilisation de la fonction unifiée
  const { buttonProps, hoverProps, href: computedHref } = getConfirmVisitPropsByStatut(
    statut,
    onComplete,
    href || id
  )

  return (
    <HoverSlideOverlay
      withHover={hoverProps.withHover}
      text={hoverProps.text}
      href={computedHref}
      className={`w-fit min-w-2 px-px h-12 rounded-md border bg-background ${className}`}
    >
      <SlideButton {...buttonProps} />
    </HoverSlideOverlay>
  )
}
