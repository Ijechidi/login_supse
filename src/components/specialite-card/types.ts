import { Medecin } from "../ux/ProfileCard"

export interface Specialite {
  nom: string
  description?: string
  medecins: Medecin[]
}
