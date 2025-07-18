"use client"
import React from 'react'
import { CalendarCard } from '../calendar/calendar-card'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useDisponibilites } from '@/hooks/useDisponibilites'
import { useCalendar } from '@/hooks/use-calendar'
import AddTimeSlot from '../availability/AddTimeSlot'
import DisponibiliteList from './DisponibiliteList'
import { filterDisponibilitesByDate } from '@/lib/utils';
import { RendezVous } from '@/types/globalTypes'
import { useRendezVous } from '@/hooks/useRendezVous'
import TimeSlotView from '../uix/calendar/TimeSlotView'
import DisponibilitesOption from '../uix/calendar/DisponibilitesOption'


export default function MedecinCalendar() {
  const { user, loading } = useUserProfile()
  const medecinId = user?.id || ''
  const { disponibilites, fetchDisponibilites, add, remove } = useDisponibilites(medecinId)
  const { rendezVous, loading: loadingRdv } = useRendezVous(medecinId);
  // Pour le calendrier, on simule les rendez-vous à partir des disponibilités (ou on peut brancher les vrais rendez-vous si besoin)
 
  
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    navigateMonth,
  } = useCalendar(rendezVous)

  React.useEffect(() => {
    if (selectedDate) {
      fetchDisponibilites();
    }
  }, [selectedDate, fetchDisponibilites]);

  console.log("Disponibilités :", disponibilites);
  

  // Filtrer les créneaux pour la date sélectionnée
  const filteredDisponibilites = filterDisponibilitesByDate(disponibilites, selectedDate);

  // Log pour debug
  console.log('Disponibilités filtrées:', filteredDisponibilites);

  if (!user) return <div>Chargement du profil...</div>

  return (
    <div className="flex flex-col   w-auto md:flex-row gap-4 md:gap-12 justify-center">
      <div className="flex-1 max-w-lg">
        <CalendarCard
          currentDate={currentDate}
          days={calendarDays}
          selectedDate={selectedDate}
          onNavigate={navigateMonth}
          onDaySelect={dayData => setSelectedDate(dayData.date)}
        />
      </div>
      <div className="flex  justify-center">
        <div className='flex flex-col gap-2'>
          <h2 className="text-xl font-bold mb-4 text-center">Gérer mes disponibilités</h2>
          {selectedDate && (
            <AddTimeSlot
              onAddSlot={async (heureDebut, heureFin) => {
                // Construction correcte des Date ISO pour Prisma
                const [hDebut, mDebut] = heureDebut.split(":").map(Number);
                const [hFin, mFin] = heureFin.split(":").map(Number);
                const dateDebut = new Date(selectedDate);
                dateDebut.setHours(hDebut, mDebut, 0, 0);
                const dateFin = new Date(selectedDate);
                dateFin.setHours(hFin, mFin, 0, 0);
                console.log('Création créneau:', { heureDebut: dateDebut, heureFin: dateFin });
                await add({
                  heureDebut: dateDebut,
                  heureFin: dateFin,
                });
              }}
              disabled={!selectedDate}
              existingSlots={filteredDisponibilites}
            />
          )}   
          <DisponibilitesOption 
          disponibilites={filteredDisponibilites} 
             onDelete={remove}
          />
 
        </div>
      </div>
    </div>
  )
}
