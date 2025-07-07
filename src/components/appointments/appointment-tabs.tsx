"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Settings } from "lucide-react"
import { AppointmentList } from "./appointment-list"
import { AvailabilityManager } from "../availability/availability-manager"
import type { RendezVousType, TypeRendezVous } from "@/types/rendezVous"

interface AppointmentTabsProps {
  appointments: RendezVousType[]
  typesRendezVous: TypeRendezVous[]
  selectedDate: Date | null
  hoveredDay: string | null
  medecinId: string
  onModifyAppointment?: (appointment: RendezVousType) => void
  onCancelAppointment?: (appointment: RendezVousType) => void
}

export function AppointmentTabs({
  appointments,
  typesRendezVous,
  selectedDate,
  hoveredDay,
  medecinId,
  onModifyAppointment,
  onCancelAppointment,
}: AppointmentTabsProps) {
  return (
    <Tabs defaultValue="appointments" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="appointments" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Rendez-vous
        </TabsTrigger>
        <TabsTrigger value="availability" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Disponibilités
        </TabsTrigger>
      </TabsList>

      <TabsContent value="appointments" className="mt-4">
        <AppointmentList
          appointments={appointments}
          typesRendezVous={typesRendezVous}
          selectedDate={selectedDate}
          hoveredDay={hoveredDay}
        />
      </TabsContent>

      <TabsContent value="availability" className="mt-4">
        <AvailabilityManager
          medecinId={medecinId}
          selectedDate={selectedDate}
          appointments={appointments}
          onModifyAppointment={onModifyAppointment}
          onCancelAppointment={onCancelAppointment}
        />
      </TabsContent>
    </Tabs>
  )
}
