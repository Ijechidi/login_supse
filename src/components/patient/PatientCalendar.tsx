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
    <div className=" w-full flex justify-center  h-[630px]  overflow-hidden  mx-auto p-0">
      <div className="flex  w-full flex-col md:flex-row gap-8">
        {/* Calendrier */}
        <div className="flex-1 pt-12">
          <CalendarCard
            currentDate={currentDate}
            days={calendarDays}
            selectedDate={selectedDate}
            onNavigate={navigateMonth}
            onDaySelect={dayData => setSelectedDate(dayData.date)}
       
          />
        </div>


          <div className="p-4 flex  gap-8 flex-col"> 
            <h1> Choisisez une heure disponible pour le rendez-vous </h1>
            <div className="flex flex-col py-2 border-y gap-4 overflow-y-scroll scrollbar-hidden" >
              {filteredDisponibilites?.map((slot)=>(
              <TimeOption key={slot.id} slot={slot} />
              ))}
            </div>
            
          </div>



      </div>
      <Notifications />
    </div>
  )
}
