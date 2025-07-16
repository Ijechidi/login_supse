"use client"
import React from 'react'
import { CalendarCard } from '../calendar/calendar-card'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useDisponibilites } from '@/hooks/useDisponibilites'
import { useCalendar } from '@/hooks/use-calendar'
import type { RendezVousType } from '@/types/rendezVous'
import AddTimeSlot from '../availability/AddTimeSlot'
import DisponibiliteList from './DisponibiliteList'


export default function MedecinCalendar() {
  const { user, loading } = useUserProfile()
  const medecinId = user?.id || ''
  const { disponibilites, fetchDisponibilites, add, remove } = useDisponibilites(medecinId)

  // Pour le calendrier, on simule les rendez-vous à partir des disponibilités (ou on peut brancher les vrais rendez-vous si besoin)
  const fakeAppointments: RendezVousType[] = [] // À remplacer par les vrais rendez-vous si besoin
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    navigateMonth,
  } = useCalendar(fakeAppointments)

  if (!user) return <div>Chargement du profil...</div>

  // Filtrer les créneaux pour la date sélectionnée
  const filteredDisponibilites = selectedDate
    ? disponibilites.filter(d => {
        const dDate = d.heureDebut instanceof Date ? d.heureDebut : new Date(d.heureDebut);
        return dDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
      })
    : disponibilites;

  // Log pour debug
  console.log('Disponibilités filtrées:', filteredDisponibilites);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <CalendarCard
          currentDate={currentDate}
          days={calendarDays}
          selectedDate={selectedDate}
          onNavigate={navigateMonth}
          onDaySelect={dayData => setSelectedDate(dayData.date)}
        />
      </div>
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
        <DisponibiliteList
          disponibilites={filteredDisponibilites}
          onDelete={remove}
        />

       
      </div>
    </div>
  )
}
