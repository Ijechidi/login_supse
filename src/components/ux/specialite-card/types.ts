import { Medecin } from "../ProfileCard"


export interface Specialite {
  nom: string
  description?: string
  medecins: Medecin[]
}
