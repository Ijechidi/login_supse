"use client"

import { useState, useCallback, useEffect } from "react"
import { CalendarCard } from "./calendar/calendar-card"
import { TimeSlotList } from "./time-slots/time-slot-list"
import { Notifications } from "@/components/ui/notifications"
import { useCalendar } from "../hooks/use-calendar"
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { useRendezVous } from "@/hooks/useRendezVous";
import { filterDisponibilitesByDate, filterRendezVousByPatientId } from "@/lib/utils";
import { RendezVous } from "@/types/globalTypes"
import { useUserProfile } from "@/hooks/useUserProfile"
import TimeSlotView from "./uix/calendar/TimeSlotView"
import { SlideButton } from "./uix/tools/SlideButton"
import TimeOption from "./uix/calendar/TimeOption"
import { useRendezVousWithDispo } from "@/hooks/useDisponibilitesEtRendezVous"

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
  const { user } = useUserProfile()


  if (!user || !user.id) {
    return("/")
  }

  const patientId = user?.id!


   
  const { disponibilites, fetchDisponibilites, add, remove } = useDisponibilites(medecinId)
  const { rendezVous, loading: loadingRdv , fetchRendezVous, create , disponibilitesAvecRendezVous  } = useRendezVous(medecinId);




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
  const filteredDispoRdv = filterDisponibilitesByDate(disponibilitesAvecRendezVous, selectedDate);

  // Log pour debug
  console.log('Disponibilités filtrées:', filteredDisponibilites);
  console.log("diporedevous :" , filteredDispoRdv)
const patientRendezVous = filterRendezVousByPatientId(rendezVous, patientId);

console.log("rendevous :", rendezVous)

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


          <div className="flex p-8 gap-4 flex-col"> 
            <h1> it just my manual recuperation to time in calendar </h1>
            {filteredDispoRdv?.map((slot)=>(
            <TimeOption key={slot.id} slot={slot} />
            ))}
            
          </div>



      </div>
      <Notifications />
    </div>
  )
}
