import { Statut } from "@prisma/client"
import { SlideButtonProps } from "../tools/SlideButton"


type StatutCustom = Statut | "NON"


export function getPatientButtonPropsByStatut(
  statut: StatutCustom = "NON"
): Partial<SlideButtonProps> {
  switch (statut) {
    case "NON":
      return {
        text: "prennez rendez-vous",
        successText: "Visite créee",
        loadingText: "Validation...",
        disabled: true,
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
        text: "Confirmer",
        successText: "Visite confirmer",
        loadingText: "Annulation...",
        status:"success",
        disabled: true,
      }
    case "ANNULE":
      return {
        text: "Rendez-vous annulé",
        successText: "Visite confirmer",
        errorText: "Rendez-vous annulé",
        loadingText: "Chargement...",
        disabled: true,
        status:"error"
      
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
        text: "Prennez rendez-vous",
         successText: "Visite confirmer",
        loadingText: "Validation...",
        disabled: true,
      }
  }
}


export function getButtonPropsByStatut(
  statut: StatutCustom = "NON"
): Partial<SlideButtonProps> {
  switch (statut) {
    case "NON":
      return {
        text: "pas de rendez-vous",
        successText: "Visite créée",
        loadingText: "Validation...",
        disabled: true,
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
        text: "Confirmer",
        successText: "Visite confirmer",
        loadingText: "Annulation...",
        status:"success",
        disabled: true,
      }
    case "ANNULE":
      return {
        text: "Rendez-vous annulé",
        successText: "Visite confirmer",
        errorText: "Rendez-vous annulé",
        loadingText: "Chargement...",
        disabled: true,
        status:"error"
      
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
        text: "Pas encore de rendevous",
         successText: "Visite confirmer",
        loadingText: "Validation...",
        disabled: true,
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
        text: "pas de rendez-vous"
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
        withHover: false,
        text: "reprogrammer"
      }
    
    case "TERMINE":
      return {

        withHover: true,
        text: "terminé"
      }
    
    default:
      return {
        withHover: false,
        text: "formulaire"
      }
  }
}

/* Patient */
export function getPatientHoverSlideOverlayPropsByStatut(
  statut?: StatutCustom,
): HoverSlideOverlayProps {
  switch (statut) {

    case "NON":
      return {
        withHover: true,
        text: "Formulaire"
      }
    case "EN_ATTENTE":
      return {
        withHover: false,
        text: "En Attente"
      }
    
    case "CONFIRME":
      return {
        withHover: false,
        text: "rendez-vous confirmer"
      }
    
    case "ANNULE":
      return {
        withHover: true,
        text: "Anuller"
      }
    
    case "TERMINE":
      return {

        withHover: true,
        text: "terminé"
      }
    
    default:
      return {
        withHover: false,
        text: "formulaire"
      }
  }
}