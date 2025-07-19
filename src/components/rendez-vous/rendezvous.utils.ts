import { Statut } from "@prisma/client"
import { SlideButtonProps } from "../tools/SlideButton"


type StatutCustom = Statut | "NON"

export function getButtonPropsByStatut(
  statut: StatutCustom = "NON"
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
        successText: "Visite confirmer",
        loadingText: "Validation...",
        disabled: false,
        resolveTo:"success",
      
        
      }
    case "CONFIRME":
      return {
        text: "Rendez-vous confirmé",
        successText: "Visite confirmer",
        loadingText: "Chargement...",
        status:"success",
        disabled: true,
      }
    case "ANNULE":
      return {
        text: "Rendez-vous annulé",
        successText: "Visite confirmer",
        loadingText: "Chargement...",
        disabled: true,
      }
    case "TERMINE":
      return {
        text: "Visite terminée",
          successText: "Visite confirmer",
        loadingText: "Chargement...",
        disabled: true,
      }
    default:
      return {
        text: "Prendre rendez-vous",
         successText: "Visite confirmer",
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
        text: "confirmé"
      }
    
    case "ANNULE":
      return {
        withHover: true,
        text: "reprogrammer"
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