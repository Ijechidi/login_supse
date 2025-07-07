"use client"

import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface RendezVous {
  id: string
  dateDebut: Date
  dateFin?: Date
  motif: string
  statut: 'en_attente' | 'confirme' | 'annule' | 'termine'
  type: {
    nom: string
    couleur?: string
  }
  medecin: {
    user: {
      nom: string
      prenom: string
    }
  }
}

interface PlanningCalendarProps {
  rendezVous?: RendezVous[]
  onDateSelect?: (date: Date) => void
  selectedDate?: Date
  className?: string
}

export default function PlanningCalendar({ 
  rendezVous = [], 
  onDateSelect,
  selectedDate,
  className 
}: PlanningCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  
  // Filtrer les rendez-vous pour la date sélectionnée
  const rendezVousForDate = rendezVous.filter((rdv) => 
    date && isSameDay(new Date(rdv.dateDebut), date)
  )

  // Gestionnaire de sélection de date
  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    if (newDate && onDateSelect) {
      onDateSelect(newDate)
    }
  }

  // Obtenir les dates avec des rendez-vous
  const bookedDates = rendezVous.map(rdv => new Date(rdv.dateDebut))

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          locale={fr}
          modifiers={{
            booked: bookedDates
          }}
          broadcastCalendar
          modifiersClassNames={{
            booked: "bg-primary/10 rounded-full"
          }}
          disabled={(date) => date < addDays(new Date(), -1)}
          className="rounded-md border shadow"
        />
      </div>

      {date && rendezVousForDate.length > 0 && (
        <Card className="flex-1 p-4">
          <h3 className="font-semibold mb-4">
            Rendez-vous du {format(date, 'dd MMMM yyyy', { locale: fr })}
          </h3>
          <div className="max-h-[300px] overflow-y-auto space-y-4">
            {rendezVousForDate.map((rdv) => (
              <div
                key={rdv.id}
                className="p-3 border rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={rdv.statut === 'confirme' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {rdv.type.nom}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(rdv.dateDebut), 'HH:mm')}
                  </span>
                </div>
                <p className="text-sm font-medium">
                  Dr. {rdv.medecin.user.prenom} {rdv.medecin.user.nom}
                </p>
                <p className="text-sm text-muted-foreground">{rdv.motif}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
