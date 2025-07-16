"use client"

import { Calendar, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { TimeSlot as TimeSlotType } from "@/hooks/use-calendar"
import type { TypeRendezVous } from "@/types/rendezVous"
import { TimeSlot } from "../time-slots/time-slot"

interface TimeSlotListProps {
  selectedDate: Date | null
  timeSlots: TimeSlotType[]
  typesRendezVous: TypeRendezVous[]
  onTimeSlotSelect: (slot: TimeSlotType) => void
  onViewAppointmentDetails?: (slot: TimeSlotType) => void
}

export function TimeList({
  selectedDate,
  timeSlots,
  typesRendezVous,
  onTimeSlotSelect,
  onViewAppointmentDetails,
}: TimeSlotListProps) {
  return (
    <Card className="bg-card border p-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {selectedDate
            ? `Créneaux du ${selectedDate.toLocaleDateString("fr-FR")}`
            : "Sélectionnez une date"}
        </CardTitle>
        {selectedDate && (
          <CardDescription>
            Cliquez sur un créneau disponible pour réserver ou sur un créneau
            occupé pour voir les détails
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {selectedDate ? (
         
         <div>
          
         </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>
              Sélectionnez une date dans le calendrier pour voir les créneaux
              disponibles
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
