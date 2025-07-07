"use client"

import { useState, useMemo } from "react"
import type { RendezVousType } from "../types/rendezVous"

export interface DayData {
  day: string
  date: Date
  isCurrentMonth: boolean
  rendezVous: RendezVousType[]
}

export interface TimeSlot {
  time: string
  available: boolean
  rendezVous?: RendezVousType
}

export function useCalendar(existingAppointments: RendezVousType[]) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: DayData[] = []
    const currentDateIter = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dayRendezVous = existingAppointments.filter(
        (rv) => rv.dateDebut.toDateString() === currentDateIter.toDateString(),
      )

      days.push({
        day: currentDateIter.getDate().toString().padStart(2, "0"),
        date: new Date(currentDateIter),
        isCurrentMonth: currentDateIter.getMonth() === month,
        rendezVous: dayRendezVous,
      })

      currentDateIter.setDate(currentDateIter.getDate() + 1)
    }

    return days
  }, [currentDate, existingAppointments])

  const timeSlots = useMemo(() => {
    if (!selectedDate) return []

    const slots: TimeSlot[] = []
    const workingHours = [
      { start: 9, end: 12 },
      { start: 14, end: 18 },
    ]

    workingHours.forEach(({ start, end }) => {
      for (let hour = start; hour < end; hour++) {
        const timeString = `${hour.toString().padStart(2, "0")}:00`
        const appointmentTime = new Date(selectedDate)
        appointmentTime.setHours(hour, 0, 0, 0)

        const existingAppointment = existingAppointments.find(
          (rv) => rv.dateDebut.getTime() === appointmentTime.getTime(),
        )

        slots.push({
          time: timeString,
          available: !existingAppointment,
          rendezVous: existingAppointment,
        })
      }
    })

    return slots
  }, [selectedDate, existingAppointments])

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === "next" ? 1 : -1)))
  }

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    timeSlots,
    navigateMonth,
  }
}
