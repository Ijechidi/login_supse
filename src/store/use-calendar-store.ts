"use client"

import { Disponibilite } from "@/types/globalTypes"
import { RendezVous } from "@prisma/client"
import { create } from "zustand"
import { persist } from "zustand/middleware"


interface CalendarState {
  // État
  appointments: RendezVous[]
  availabilities: Disponibilite[]
  selectedDate: Date | null
  hoveredDay: string | null
  selectedAppointment: RendezVous| null
  isBookingModalOpen: boolean
  isAppointmentDetailsOpen: boolean
  selectedTimeSlot: string | null

  // Actions - Rendez-vous
  addAppointment: (appointment: Omit<RendezVous, "id" | "createdAt">) => RendezVous
  updateAppointment: (id: string, updates: Partial<RendezVous>) => void
  deleteAppointment: (id: string) => void
  getAppointmentsByDate: (date: Date) => RendezVous[]

  // Actions - Disponibilités
  addAvailability: (availability: Omit<Disponibilite, "id" | "createdAt" | "updatedAt">) => Disponibilite
  updateAvailability: (id: string, updates: Partial<Disponibilite>) => void
  removeAvailability: (id: string) => void

  // Actions - UI
  setSelectedDate: (date: Date | null) => void
  setHoveredDay: (day: string | null) => void
  setSelectedAppointment: (appointment: RendezVous| null) => void
  setIsBookingModalOpen: (isOpen: boolean) => void
  setIsAppointmentDetailsOpen: (isOpen: boolean) => void
  setSelectedTimeSlot: (timeSlot: string | null) => void

  // Actions - Notifications
  showNotification: (message: string, type: "success" | "error" | "info") => void
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      // État initial
      appointments: [],
      availabilities: [],
      selectedDate: null,
      hoveredDay: null,
      selectedAppointment: null,
      isBookingModalOpen: false,
      isAppointmentDetailsOpen: false,
      selectedTimeSlot: null,

      // Actions - Rendez-vous
      addAppointment: (appointmentData) => {
        const appointment: RendezVous = {
          ...appointmentData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        }

        set((state) => ({
          appointments: [...state.appointments, appointment],
        }))

        get().showNotification(`Rendez-vous créé avec succès`, "success")
        return appointment
      },

      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, ...updates } : appointment,
          ),
        }))

        get().showNotification(`Rendez-vous mis à jour`, "success")
      },

      deleteAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((appointment) => appointment.id !== id),
        }))

        get().showNotification(`Rendez-vous supprimé`, "info")
      },

      getAppointmentsByDate: (date) => {
        return get().appointments.filter((appointment) => appointment.dateDebut.toDateString() === date.toDateString())
      },

      // Actions - Disponibilités
      addAvailability: (availabilityData) => {
        const availability: Disponibilite = {
          ...availabilityData,
          id: Math.random().toString(36).substr(2, 9),
        }

        set((state) => ({
          availabilities: [...state.availabilities, availability],
        }))

        get().showNotification(`Créneau de disponibilité ajouté`, "success")
        return availability
      },

      updateAvailability: (id, updates) => {
        set((state) => ({
          availabilities: state.availabilities.map((availability) =>
            availability.id === id ? { ...availability, ...updates, updatedAt: new Date() } : availability,
          ),
        }))

        get().showNotification(`Disponibilité mise à jour`, "success")
      },

      removeAvailability: (id) => {
        set((state) => ({
          availabilities: state.availabilities.filter((availability) => availability.id !== id),
        }))

        get().showNotification(`Créneau de disponibilité supprimé`, "info")
      },

      // Actions - UI
      setSelectedDate: (date) => set({ selectedDate: date }),
      setHoveredDay: (day) => set({ hoveredDay: day }),
      setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),
      setIsBookingModalOpen: (isOpen) => set({ isBookingModalOpen: isOpen }),
      setIsAppointmentDetailsOpen: (isOpen) => set({ isAppointmentDetailsOpen: isOpen }),
      setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),

      // Actions - Notifications
      showNotification: (message, type) => {
        // Cette fonction sera remplacée par l'implémentation réelle des notifications
        console.log(`[${type.toUpperCase()}] ${message}`)
        // Ici, on pourrait intégrer avec un système de toast comme react-hot-toast
      },
    }),
    {
      name: "medical-calendar-storage",
      partialize: (state) => ({
        // Ne persister que certaines parties de l'état
        appointments: state.appointments,
        availabilities: state.availabilities,
      }),
    },
  ),
)
