"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, User, Phone } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RendezVousType, TypeRendezVous } from "@/types/rendezVous"

interface AppointmentListProps {
  appointments: RendezVousType[]
  typesRendezVous: TypeRendezVous[]
  selectedDate: Date | null
  hoveredDay: string | null
}

export function AppointmentList({
  appointments,
  typesRendezVous,
  selectedDate,
  hoveredDay,
}: AppointmentListProps) {
  const filteredAppointments = appointments.filter((appointment) => {
    if (selectedDate) {
      return appointment.dateDebut.toDateString() === selectedDate.toDateString()
    }
    if (hoveredDay) {
      const dayNumber = Number.parseInt(hoveredDay)
      return appointment.dateDebut.getDate() === dayNumber
    }
    return true
  })

  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => a.dateDebut.getTime() - b.dateDebut.getTime()
  )

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "confirme":
        return "Confirmé"
      case "en_attente":
        return "En attente"
      case "annule":
        return "Annulé"
      case "termine":
        return "Terminé"
      default:
        return statut
    }
  }

  const getStatusVariant = (statut: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (statut) {
      case "confirme":
        return "default"
      case "en_attente":
        return "secondary"
      case "annule":
        return "destructive"
      case "termine":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTypeRendezVous = (typeId: string) => {
    return typesRendezVous.find((type) => type.id === typeId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {selectedDate
            ? `Rendez-vous du ${selectedDate.toLocaleDateString("fr-FR")}`
            : hoveredDay
              ? `Rendez-vous du ${hoveredDay}`
              : "Tous les rendez-vous"}
        </CardTitle>
        <CardDescription>
          {sortedAppointments.length} rendez-vous{" "}
          {selectedDate || hoveredDay ? "pour cette date" : "au total"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedAppointments.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {sortedAppointments.map((appointment, index) => {
                const typeRdv = getTypeRendezVous(appointment.meta?.typeRendezVous || "")

                return (
                  <motion.div
                    key={appointment.id}
                    className="border rounded-lg p-4 bg-muted hover:bg-muted/70 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {appointment.dateDebut.toLocaleDateString("fr-FR")} –{" "}
                          {appointment.dateDebut.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <Badge variant={getStatusVariant(appointment.statut)} className="text-xs">
                        {getStatusLabel(appointment.statut)}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2">
                      {appointment.motif}
                    </h3>

                    {appointment.meta?.patientName && (
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {appointment.meta.patientName}
                        </span>
                      </div>
                    )}

                    {appointment.meta?.phone && (
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {appointment.meta.phone}
                        </span>
                      </div>
                    )}

                    {typeRdv && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: typeRdv.couleur }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {typeRdv.nom}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucun rendez-vous {selectedDate || hoveredDay ? "pour cette date" : "trouvé"}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
