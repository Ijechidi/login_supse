"use client"

import { CalendarDay } from "./calendar-day"
import type { DayData } from "@/hooks/use-calendar"

interface CalendarGridProps {
  days: DayData[]
  selectedDate: Date | null
  onDaySelect: (dayData: DayData) => void
  onDayHover?: (day: string | null) => void
}

const daysOfWeek = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"]

/**
 * Grille du calendrier avec les jours de la semaine et les dates
 */
export function CalendarGrid({ days, selectedDate, onDaySelect, onDayHover }: CalendarGridProps) {
  return (
    <div className="space-y-4">
      {/* En-têtes des jours */}
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="px-0.5 rounded-xl py-1 text-center text-xs font-medium bg-[#323232] text-primary-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayData, index) => (
          <CalendarDay
            key={dayData.date.getTime()}
            dayData={dayData}
            isSelected={selectedDate?.toDateString() === dayData.date.toDateString()}
            onSelect={onDaySelect}
            onHover={onDayHover}
          />
        ))}
      </div>
    </div>
  )
}
