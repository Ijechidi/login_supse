"use client"

import { ProfileCard } from "@/components/ux/ProfileCard"
import { notFound } from "next/navigation"
import MedicalBookingCalendar from "@/components/medical-booking-calendar"
import { getMedecinById } from "@/utils/getMedecinById"
import { useAppointmentsStore } from "@/store/use-appointments-store"
import { useEffect } from "react"
import type { TypeRendezVous, RendezVousType } from "@/types/rendezVous"

// Types de rendez-vous disponibles
const typesRendezVous: TypeRendezVous[] = [
  {
    id: "consultation",
    nom: "Consultation",
    description: "Consultation standard de 30 minutes",
    couleur: "var(--appointment-consultation)",
  },
  {
    id: "suivi",
    nom: "Suivi",
    description: "Rendez-vous de suivi de 15 minutes",
    couleur: "var(--appointment-followup)",
  },
  {
    id: "urgence",
    nom: "Urgence",
    description: "Consultation d'urgence de 45 minutes",
    couleur: "var(--appointment-emergency)",
  },
  {
    id: "specialise",
    nom: "Spécialisé",
    description: "Consultation spécialisée de 60 minutes",
    couleur: "var(--appointment-specialized)",
  },
]

export default function MedecinPage({
  params,
}: {
  params: { medecinId: string }
}) {
  const { medecinId } = params
  const medecin = getMedecinById(medecinId)
  const setSelectedMedecin = useAppointmentsStore((state) => state.setSelectedMedecin)
  const showNotification = useAppointmentsStore((state) => state.showNotification)

  useEffect(() => {
    setSelectedMedecin(medecinId)
  }, [medecinId, setSelectedMedecin])

  if (!medecin) {
    notFound()
  }

  const handleBookAppointment = (appointment: any) => {
    showNotification(
      `Rendez-vous confirmé avec Dr. ${medecin.nom} pour le ${appointment.dateDebut.toLocaleDateString()}`,
      "success"
    )
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.prenom} {medecin.nom}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous avec votre {medecin.specialite}.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <section className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Informations du médecin</h2>
          <ProfileCard medecin={medecin} className="w-full sticky top-4" />
        </section>

        <section className="lg:col-span-3">
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
