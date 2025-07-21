"use client"

import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "../header/theme-switcher"



interface CalendarHeaderProps {
  currentDate: Date
  onNavigate: (direction: "prev" | "next") => void
}

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

/**
 * En-tête du calendrier avec navigation et sélecteur de thème
 */
export function CalendarHeader({ currentDate, onNavigate }: CalendarHeaderProps) {
  return (
    <div className="flex items-center  justify-between mb-6">
      <div className="text-4xl font-bold tracking-wider text-foreground">
        {monthNames[currentDate.getMonth()].substring(0, 2).toUpperCase()}{" "}
        <span className="opacity-50">{currentDate.getFullYear()}</span>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("prev")}
          className="border-0 text-muted-foreground hover:text-foreground"
        >
          ←
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("next")}
          className="border-0 text-muted-foreground hover:text-foreground"
        >
          →
        </Button>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
