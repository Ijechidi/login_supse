"use client"

import { useState, useCallback, useEffect } from "react"
import { CalendarCard } from "./calendar/calendar-card"
import { TimeSlotList } from "./time-slots/time-slot-list"
import { Notifications } from "@/components/ui/notifications"
import { useCalendar } from "../hooks/use-calendar"
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { useRendezVous } from "@/hooks/useRendezVous";
import { filterDisponibilitesByDate } from "@/lib/utils";
import { RendezVous } from "@/types/globalTypes"
import { useUserProfile } from "@/hooks/useUserProfile"
import TimeSlotView from "./uix/calendar/TimeSlotView"

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
  const { user, loading } = useUserProfile()
  // const medecinId = user?.id || ''
  const { disponibilites, fetchDisponibilites, add, remove } = useDisponibilites(medecinId)
  const { rendezVous, loading: loadingRdv , fetchRendezVous, create  } = useRendezVous(medecinId);
  // Pour le calendrier, on simule les rendez-vous à partir des disponibilités (ou on peut brancher les vrais rendez-vous si besoin)
 
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    navigateMonth,
  } = useCalendar(rendezVous)

  useEffect(() => {
    if (selectedDate) {
      fetchDisponibilites();
      fetchRendezVous();
    }
  }, [selectedDate, fetchDisponibilites, fetchRendezVous]);

  console.log("Disponibilités :", disponibilites);

  // Filtrer les créneaux pour la date sélectionnée
  const filteredDisponibilites = filterDisponibilitesByDate(disponibilites, selectedDate);

  // Log pour debug
  console.log('Disponibilités filtrées:', filteredDisponibilites);




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
            onDaySelect={dayData => setSelectedDate(dayData.date)}
       
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
<div className="flex p-8 gap-4 flex-col"> 
  <h1> it juste my manual recuperation to time in calendar </h1>
  {filteredDisponibilites?.map((slot)=>(
    <TimeSlotView key={slot.id} slot={slot} />
  ))}
  
</div>



      </div>
      <Notifications />
    </div>
  )
}
