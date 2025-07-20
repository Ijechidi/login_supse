import { Statut } from "@prisma/client"
import { SlideButtonProps } from "../tools/SlideButton"


type StatutCustom = Statut | "NON"

export function getButtonPropsByStatut(
  statut: StatutCustom = "NON",
  onAnnule?: () => void
): Partial<SlideButtonProps> {
  switch (statut) {
    case "NON":
      return {
        text: "Prendre rendez-vous",
        successText: "Visite créée",
        loadingText: "Validation...",
        disabled: false,
      }
    case "EN_ATTENTE":
      return {
        text: "Confirmer",
        successText: "Visite confirmée",
        loadingText: "Validation...",
        disabled: false,
        resolveTo: "success",
        autoReset: true,

      }
    case "CONFIRME":
      return {
        text: "Annuler",
        successText: "Rendez-vous annulé",
        loadingText: "Annulation...",
        disabled: false,
        resolveTo: "success",
        onComplete: onAnnule,
        autoReset: true,
      }
    case "ANNULE":
      return {
        text: "Rendez-vous annulé",
        successText: "Visite annulée",
        loadingText: "Chargement...",
        disabled: true,
      }
    case "TERMINE":
      return {
        text: "Visite terminée",
        successText: "Visite confirmée",
        loadingText: "Chargement...",
        disabled: true,
      }
    default:
      return {
        text: "Prendre rendez-vous",
        successText: "Visite confirmée",
        loadingText: "Validation...",
        disabled: false,
      }
  }
}



export interface HoverSlideOverlayProps {
  withHover: boolean
  text: string
}

/**
 * Retourne les props pour HoverSlideOverlay en fonction du statut
 */
export function getHoverSlideOverlayPropsByStatut(
  statut?: StatutCustom,
): HoverSlideOverlayProps {
  switch (statut) {
    case "NON":
      return {
        withHover: true,
        text: "formulaire"
      }
    case "EN_ATTENTE":
      return {
        withHover: false,
        text: ""
      }
    case "CONFIRME":
      return {
        withHover: false,
        text: "Rendez-vous confirmé"
      }
    case "ANNULE":
      return {
        withHover: true,
        text: "Rendez-vous annulé"
      }
    case "TERMINE":
      return {
        withHover: false,
        text: "terminé"
      }
    default:
      return {
        withHover: true,
        text: "formulaire"
      }
  }
}

export interface ConfirmVisitUnifiedProps {
  buttonProps: Partial<SlideButtonProps>
  hoverProps: HoverSlideOverlayProps
  href?: string
}

export function getConfirmVisitPropsByStatut(
  statut: StatutCustom = "NON",
  onAnnule?: () => void,
  href?: string
): ConfirmVisitUnifiedProps {
  let buttonProps = getButtonPropsByStatut(statut, onAnnule)
  let hoverProps = getHoverSlideOverlayPropsByStatut(statut)
  return {
    buttonProps,
    hoverProps,
    href,
  }
}