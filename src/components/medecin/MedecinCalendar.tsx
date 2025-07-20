"use client"
import React from 'react'

import { useUserProfile } from '@/hooks/useUserProfile'
import { useDisponibilites } from '@/hooks/useDisponibilites'
import { useCalendar } from '@/hooks/use-calendar'

import { filterDisponibilitesByDate } from '@/lib/utils';
import { useRendezVous } from '@/hooks/useRendezVous'
import { CalendarCard } from '../calendar/calendar-card'
import DisponibilitesOption from '../ux/calendar/DisponibilitesOption'
import AddTimeSlot from '../ux/calendar/AddTimeSlot'
import TimeOption from '../ux/calendar/TimeOption'
import { Statut } from '@prisma/client'



export default function MedecinCalendar() {
  const { user, loading } = useUserProfile()
  const medecinId = user?.id || ''
  const { disponibilites, createDisponibilite ,removeDisponibilite } = useDisponibilites({medecinId})
  const { rendezVous, loading: loadingRdv, updateRendezVous } = useRendezVous(medecinId);

 
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    navigateMonth,
  } = useCalendar(rendezVous)



  console.log("Disponibilités 22 :", disponibilites);
  

  // Filtrer les créneaux pour la date sélectionnée
  const filteredDisponibilites = filterDisponibilitesByDate(disponibilites, selectedDate);

  // Log pour debug
  console.log('Disponibilités filtrées medecin:', filteredDisponibilites);

  // Fonction pour mettre à jour le statut d'un rendez-vous
  const handleUpdateRendezVousStatus = (rendezVousId: string, statut: Statut) => {
    updateRendezVous.mutate({ id: rendezVousId, data: { statut } });
  };

  if (!user) return <div>Chargement du profil...</div>

  return (
    <div className="flex flex-col h-full  w-auto md:flex-row gap-4 md:gap-12 justify-center">
      <div className="flex flex-1">
        <CalendarCard
          currentDate={currentDate}
          days={calendarDays}
          selectedDate={selectedDate}
          onNavigate={navigateMonth}
          onDaySelect={dayData => setSelectedDate(dayData.date)}
        />
      </div>
      <div className="flex  justify-center">
        <div className='flex w-full  flex-col gap-2'>
          <h2 className="text-xl font-bold mb-4 text-center">Gérer mes disponibilités</h2>

<AddTimeSlot
  medecinId={medecinId}
  date={selectedDate}
  existingSlots={filteredDisponibilites}
/>

          <DisponibilitesOption patients={[]}
            disponibilites={filteredDisponibilites} 
            onDelete={removeDisponibilite.mutate}
            onUpdateRendezVousStatus={handleUpdateRendezVousStatus}
          />

          {/* <TimeOption slot={filteredDisponibilites[0]} /> */}
 
        </div>
      </div>
    </div>
  )
}
