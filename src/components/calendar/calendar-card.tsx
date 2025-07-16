"use client"

import { CalendarHeader } from "./calendar-header"
import { CalendarGrid } from "./calendar-grid"
import type { DayData } from "@/hooks/use-calendar"

interface CalendarCardProps {
  currentDate: Date
  days: DayData[]
  selectedDate: Date | null
  onNavigate: (direction: "prev" | "next") => void
  onDaySelect: (dayData: DayData) => void
  onDayHover?: (day: string | null) => void
}

/**
 * Carte principale du calendrier
 */
export function CalendarCard({
  currentDate,
  days,
  selectedDate,
  onNavigate,
  onDaySelect,
  onDayHover,
}: CalendarCardProps) {
  return (
    <div className="w-full max-w-lg rounded-2xl p-4 lg:p-6  border border-border">
      <CalendarHeader currentDate={currentDate} onNavigate={onNavigate} />
      <CalendarGrid days={days} selectedDate={selectedDate} onDaySelect={onDaySelect} onDayHover={onDayHover} />
    </div>
  )
}
