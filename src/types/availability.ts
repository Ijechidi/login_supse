export interface TimeSlotAvailability {
  id: string
  medecinId: string
  date: Date
  heureDebut: string // Format "HH:mm"
  heureFin: string // Format "HH:mm"
  isAvailable: boolean
  isRecurring?: boolean // Pour les créneaux récurrents
  dayOfWeek?: number // 0-6 pour les créneaux récurrents
  createdAt: Date
  updatedAt: Date
}

export interface AvailabilityTemplate {
  id: string
  name: string
  slots: {
    heureDebut: string
    heureFin: string
  }[]
}
