"use client"

import { useState, useCallback } from "react"
import type { TimeSlotAvailability, AvailabilityTemplate } from "../types/availability"
import type { RendezVousType } from "../types/rendezvous"

// Templates prédéfinis
const defaultTemplates: AvailabilityTemplate[] = [
  {
    id: "standard",
    name: "Journée standard",
    slots: [
      { heureDebut: "09:00", heureFin: "12:00" },
      { heureDebut: "14:00", heureFin: "18:00" },
    ],
  },
  {
    id: "morning",
    name: "Matinée uniquement",
    slots: [{ heureDebut: "08:00", heureFin: "12:00" }],
  },
  {
    id: "afternoon",
    name: "Après-midi uniquement",
    slots: [{ heureDebut: "14:00", heureFin: "18:00" }],
  },
  {
    id: "extended",
    name: "Journée étendue",
    slots: [
      { heureDebut: "08:00", heureFin: "12:00" },
      { heureDebut: "13:00", heureFin: "19:00" },
    ],
  },
]

export function useAvailability(medecinId: string, appointments: RendezVousType[]) {
  const [availabilities, setAvailabilities] = useState<TimeSlotAvailability[]>([])
  const [templates] = useState<AvailabilityTemplate[]>(defaultTemplates)

  // Générer des créneaux de 1h à partir des disponibilités
  const generateTimeSlots = useCallback((availability: TimeSlotAvailability) => {
    const slots: { heureDebut: string; heureFin: string; id: string }[] = []
    const [startHour, startMin] = availability.heureDebut.split(":").map(Number)
    const [endHour, endMin] = availability.heureFin.split(":").map(Number)

    const startTime = startHour * 60 + startMin
    const endTime = endHour * 60 + endMin

    for (let time = startTime; time < endTime; time += 60) {
      const hour = Math.floor(time / 60)
      const min = time % 60
      const nextHour = Math.floor((time + 60) / 60)
      const nextMin = (time + 60) % 60

      slots.push({
        id: `${availability.id}-${hour}-${min}`,
        heureDebut: `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`,
        heureFin: `${nextHour.toString().padStart(2, "0")}:${nextMin.toString().padStart(2, "0")}`,
      })
    }

    return slots
  }, [])

  // Obtenir les créneaux pour une date donnée
  const getAvailabilitiesForDate = useCallback(
    (date: Date) => {
      return availabilities.filter(
        (availability) =>
          availability.date.toDateString() === date.toDateString() ||
          (availability.isRecurring && availability.dayOfWeek === date.getDay()),
      )
    },
    [availabilities],
  )

  // Obtenir les créneaux détaillés avec statut d'occupation
  const getDetailedSlotsForDate = useCallback(
    (date: Date) => {
      const dayAvailabilities = getAvailabilitiesForDate(date)
      const dayAppointments = appointments.filter((apt) => apt.dateDebut.toDateString() === date.toDateString())

      const allSlots = dayAvailabilities.flatMap((availability) => {
        const slots = generateTimeSlots(availability)
        return slots.map((slot) => {
          const appointment = dayAppointments.find((apt) => {
            const aptTime = `${apt.dateDebut.getHours().toString().padStart(2, "0")}:${apt.dateDebut.getMinutes().toString().padStart(2, "0")}`
            return aptTime === slot.heureDebut
          })

          return {
            ...slot,
            availabilityId: availability.id,
            isOccupied: !!appointment,
            appointment,
            isAvailable: availability.isAvailable,
          }
        })
      })

      return allSlots.sort((a, b) => a.heureDebut.localeCompare(b.heureDebut))
    },
    [availabilities, appointments, generateTimeSlots, getAvailabilitiesForDate],
  )

  // Ajouter une disponibilité
  const addAvailability = useCallback((availability: Omit<TimeSlotAvailability, "id" | "createdAt" | "updatedAt">) => {
    const newAvailability: TimeSlotAvailability = {
      ...availability,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setAvailabilities((prev) => [...prev, newAvailability])
    return newAvailability
  }, [])

  // Supprimer une disponibilité
  const removeAvailability = useCallback((id: string) => {
    setAvailabilities((prev) => prev.filter((availability) => availability.id !== id))
  }, [])

  // Mettre à jour une disponibilité
  const updateAvailability = useCallback((id: string, updates: Partial<TimeSlotAvailability>) => {
    setAvailabilities((prev) =>
      prev.map((availability) =>
        availability.id === id ? { ...availability, ...updates, updatedAt: new Date() } : availability,
      ),
    )
  }, [])

  // Appliquer un template
  const applyTemplate = useCallback(
    (templateId: string, date: Date) => {
      const template = templates.find((t) => t.id === templateId)
      if (!template) return

      // Supprimer les disponibilités existantes pour cette date
      setAvailabilities((prev) =>
        prev.filter((availability) => availability.date.toDateString() !== date.toDateString()),
      )

      // Ajouter les nouveaux créneaux
      template.slots.forEach((slot) => {
        addAvailability({
          medecinId,
          date,
          heureDebut: slot.heureDebut,
          heureFin: slot.heureFin,
          isAvailable: true,
        })
      })
    },
    [templates, medecinId, addAvailability],
  )

  return {
    availabilities,
    templates,
    getAvailabilitiesForDate,
    getDetailedSlotsForDate,
    addAvailability,
    removeAvailability,
    updateAvailability,
    applyTemplate,
  }
}
