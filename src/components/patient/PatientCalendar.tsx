"use client"

import { Notifications } from "@/components/ui/notifications"

import { useDisponibilites } from "@/hooks/useDisponibilites";
import { useRendezVous } from "@/hooks/useRendezVous";
import { filterDisponibilitesByDate, filterRendezVousByPatientId } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile"
import { CalendarCard } from "../calendar/calendar-card";
import TimeOption from "../ux/calendar/TimeOption";
import { useCalendar } from "@/hooks/use-calendar";


interface PatientCalendarProps {
  medecinId: string
}

/**
 * Composant principal du calendrier médical
 * Gère l'affichage et les interactions avec le calendrier, les créneaux et les rendez-vous
 */
export default function PatientCalendar({
  medecinId,
}: PatientCalendarProps) {
  const { user } = useUserProfile()
  const patientId = user?.id

  const { disponibilites, createDisponibilite ,removeDisponibilite } = useDisponibilites({medecinId})
  const { rendezVous, loading: loadingRdv } = useRendezVous(medecinId);

  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    navigateMonth,
  } = useCalendar(rendezVous)

  // Vérification de l'utilisateur après tous les hooks
  if (!user || !user.id) {
    return <div>Redirection...</div>
  }

  console.log("Disponibilités :", disponibilites);

  // Filtrer les créneaux pour la date sélectionnée
  const filteredDisponibilites = filterDisponibilitesByDate(disponibilites, selectedDate);

  // Log pour debug
  console.log('Disponibilités filtrées:', filteredDisponibilites);

  const patientRendezVous = filterRendezVousByPatientId(rendezVous, patientId);

  console.log("rendevous :", rendezVous)

  return (
    <div className=" w-full flex justify-center   mx-auto p-0">
      <div className="flex max-w-[1000px] w-full flex-col md:flex-row gap-4">
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
            {filteredDisponibilites?.map((slot)=>(
            <TimeOption key={slot.id} slot={slot} />
            ))}
            
          </div>



      </div>
      <Notifications />
    </div>
  )
}
