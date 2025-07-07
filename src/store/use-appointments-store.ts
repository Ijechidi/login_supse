import { create } from 'zustand'
import type { RendezVousType } from '@/types/rendezVous'

interface AppointmentsState {
  appointments: RendezVousType[]
  selectedMedecin: string | null
  notification: {
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  } | null
  addAppointment: (appointment: Omit<RendezVousType, "id" | "createdAt">) => RendezVousType
  updateAppointment: (id: string, updates: Partial<RendezVousType>) => void
  setSelectedMedecin: (medecinId: string) => void
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  clearNotification: () => void
}

export const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  selectedMedecin: null,
  notification: null,

  addAppointment: (appointmentData) => {
    const newAppointment: RendezVousType = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      ...appointmentData,
    }

    set((state) => ({
      appointments: [...state.appointments, newAppointment],
    }))

    return newAppointment
  },

  updateAppointment: (id, updates) => {
    set((state) => ({
      appointments: state.appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, ...updates } : appointment
      ),
    }))
  },

  setSelectedMedecin: (medecinId) => {
    set({ selectedMedecin: medecinId })
  },

  showNotification: (message, type) => {
    set({ notification: { message, type } })
    setTimeout(() => {
      set({ notification: null })
    }, 3000)
  },

  clearNotification: () => {
    set({ notification: null })
  },
})) 