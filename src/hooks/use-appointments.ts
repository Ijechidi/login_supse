"use client"

import { useState, useCallback } from "react"
import type { RendezVousType } from "../types/rendezvous"
import { mockAppointments } from "../data/mock-appointments"

export function useAppointments() {
  const [appointments, setAppointments] = useState<RendezVousType[]>(mockAppointments)

  const addAppointment = useCallback((newAppointment: Omit<RendezVousType, "id" | "createdAt">) => {
    const appointment: RendezVousType = {
      ...newAppointment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }

    setAppointments((prev) => [...prev, appointment])
    return appointment
  }, [])

  const updateAppointment = useCallback((id: string, updates: Partial<RendezVousType>) => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === id ? { ...appointment, ...updates } : appointment)),
    )
  }, [])

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
  }, [])

  const getAppointmentsByDate = useCallback(
    (date: Date) => {
      return appointments.filter((appointment) => appointment.dateDebut.toDateString() === date.toDateString())
    },
    [appointments],
  )

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
  }
}
