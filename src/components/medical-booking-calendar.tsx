"use client"

import { useState, useCallback, useEffect } from "react"
import { CalendarCard } from "./calendar/calendar-card"
import { TimeSlotList } from "./time-slots/time-slot-list"
import { Notifications } from "@/components/ui/notifications"
import { useCalendar } from "../hooks/use-calendar"
import { useAppointments } from "../hooks/use-appointments"
import { useCalendarStore } from "../store/use-calendar-store"
import { useAuth } from "@/providers/AuthProvider"
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { useRendezVous } from "@/hooks/useRendezVous";
import { TypeRendezVousEnum } from "@/types/rendezVous";
import { filterDisponibilitesByDate } from "@/lib/utils";
import { mapDisponibilitesToSlots } from "@/lib/slots";
import { useCreateRendezVous } from "@/hooks/useCreateRendezVous";
import { RendezVous } from "@/types/globalTypes"

interface MedicalBookingCalendarProps {
  medecinId: string
  typesRendezVous: RendezVous[]
  onBookAppointment?: (appointment: RendezVous) => void
}

/**
 * Composant principal du calendrier médical
 * Gère l'affichage et les interactions avec le calendrier, les créneaux et les rendez-vous
 */
export default function MedicalBookingCalendar({
  medecinId,
  typesRendezVous,
  onBookAppointment,
}: MedicalBookingCalendarProps) {
  // États locaux
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
 const {user} = useAuth()

 const { rendezVous, fetchRendezVous, create } = useRendezVous(medecinId, selectedDateStr);

 const {
  currentDate,
  selectedDate,
  setSelectedDate,
  calendarDays,
  navigateMonth,
} = useCalendar(rendezVous)

selectedDate
useEffect(() => {
  if (selectedDate) {
    fetchDisponibilites();
  }
}, [selectedDate, fetchDisponibilites]);


  // Store global
  const showNotification = useCalendarStore((state:any) => state.showNotification)

  // Hooks
  const { appointments, addAppointment, updateAppointment } = useAppointments()

  const { disponibilites, loading: loadingDispos } = useDisponibilites(medecinId, true);
  



  useEffect(() => {
    if (selectedDateStr) fetchRendezVous();
  }, [selectedDateStr, fetchRendezVous]);

  // Mapper les disponibilités en créneaux horaires pour le jour sélectionné (corrigé pour utiliser heureDebut comme dans MedecinCalendar)
  const filteredDisponibilites = filterDisponibilitesByDate(disponibilites, selectedDate);
  const filteredSlots = selectedDate ? mapDisponibilitesToSlots(filteredDisponibilites, rendezVous) : [];




  /**
   * Gère la sélection d'un jour dans le calendrier
   */
  const handleDaySelect = useCallback(
    (dayData: any) => {
      if (dayData.isCurrentMonth) {
        setSelectedDate(dayData.date)
        setSelectedTimeSlot(null)
      }
    },
    [setSelectedDate],
  )

  // Réservation réelle
  const handleTimeSlotSelect = async (slot: any) => {

  };


  /**
   * Gère la soumission d'un nouveau rendez-vous
   */
  const handleBookingSubmit = useCallback(() => {

  }, [])




  return (
    <div className=" w-full  mx-auto p-0">
      <div className="flex  flex-col md:flex-row gap-4">
        {/* Calendrier */}
        <div className="flex-1">
          <CalendarCard
            currentDate={currentDate}
            days={calendarDays}
            selectedDate={selectedDate}
            onNavigate={navigateMonth}
            onDaySelect={handleDaySelect}
       
          />
        </div>

        {/* s affichera si l user role = "PATIENT" */}

        {/* {user?.role.toUpperCase() === "PATIENT" && (
        <div className="max-w-md">
          <TimeSlotList
          onCreateRendezVous={handleBookingSubmit}
             name={user?.nom|| user?.name|| undefined}
             email={user?.email || undefined}
            selectedDate={selectedDate}
            timeSlots={filteredSlots}
            typesRendezVous={typesRendezVous}
            onTimeSlotSelect={handleTimeSlotSelect}
            onViewAppointmentDetails={()=>{}}
          />
        </div>
      
      )} */}



      </div>
      <Notifications />
    </div>
  )
}
