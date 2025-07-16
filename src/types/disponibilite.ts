export type TypeDisponibilite = {
  id: string
  medecinId: string
  jour: string // format YYYY-MM-DD
  heureDebut: string // format HH:mm ou ISO string
  heureFin: string // format HH:mm ou ISO string
  meta?: any
}
