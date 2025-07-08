"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RendezVous } from "@/types/medical"

interface AppointmentsCalendarProps {
  appointments: RendezVous[]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirme":
      return "bg-green-500"
    case "en_attente":
      return "bg-yellow-500"
    case "annule":
      return "bg-red-500"
    case "termine":
      return "bg-gray-500"
    default:
      return "bg-blue-500"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "confirme":
      return "Confirmé"
    case "en_attente":
      return "En attente"
    case "annule":
      return "Annulé"
    case "termine":
      return "Terminé"
    default:
      return status
  }
}

export function AppointmentsCalendar({ appointments }: AppointmentsCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.dateDebut)
    const today = new Date()
    return aptDate.toDateString() === today.toDateString()
  })

  const upcomingAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.dateDebut)
      const today = new Date()
      return aptDate > today
    })
    .slice(0, 5)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Rendez-vous du jour
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </div>
            <Badge variant="outline">{todayAppointments.length} RDV</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayAppointments.length > 0 ? (
            todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(appointment.statut)}`} />
                  <div>
                    <p className="font-medium">
                      {formatTime(appointment.dateDebut)} - {appointment.patient.user.nom}{" "}
                      {appointment.patient.user.prenom}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dr. {appointment.medecin.user.nom} • {appointment.type.nom}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {getStatusLabel(appointment.statut)}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">Aucun rendez-vous aujourd'hui</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prochains rendez-vous</CardTitle>
          <CardDescription>Les 5 prochains rendez-vous programmés</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(appointment.statut)}`} />
                  <div>
                    <p className="font-medium">
                      {new Date(appointment.dateDebut).toLocaleDateString("fr-FR")} à{" "}
                      {formatTime(appointment.dateDebut)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.patient.user.nom} {appointment.patient.user.prenom} • Dr.{" "}
                      {appointment.medecin.user.nom}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{ backgroundColor: appointment.type.couleur + "20", borderColor: appointment.type.couleur }}
                >
                  {appointment.type.nom}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">Aucun rendez-vous programmé</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
