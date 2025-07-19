

import { ProfileCard } from "@/components/ux/ProfileCard"

import MedicalBookingCalendar from "@/components/medical-booking-calendar"
import React from "react"


import { RendezVous } from "@prisma/client"

// Types de rendez-vous disponibles
const typesRendezVous: RendezVous[] = [

]

export default function MedecinPage({
  params,
}: {
  params: { medecinId: string } | Promise<{ medecinId: string }>
}) {




  return (
    <main className="max-w-full w-full border mx-auto lg:px-12 p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.prenom} {medecin.nom}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous avec votre {medecin.specialite}.
        </p>

      </section>

      <div className="flex flex-col gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Informations du médecin</h2>
          <ProfileCard medecin={medecin} className="" />
        </section>



        <section className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">
            Disponibilités & prise de rendez-vous
          </h2>
          <MedicalBookingCalendar
            medecinId={medecinId}
            typesRendezVous={typesRendezVous}
            onBookAppointment={handleBookAppointment}
          />
        </section>
      </div>
    </main>
  )
}
