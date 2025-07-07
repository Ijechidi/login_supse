"use client"

import MedicalBookingCalendar from "@/components/medical-booking-calendar"
import { useCalendarStore } from "@/store/use-calendar-store"
import type { RendezVousType, TypeRendezVous } from "@/types/rendezVous"

const typesRendezVous: TypeRendezVous[] = [
  {
    id: "1",
    nom: "Consultation générale",
    couleur: "#3b82f6",
    description: "Consultation médicale standard",
  },
  {
    id: "2",
    nom: "Suivi médical",
    couleur: "#10b981",
    description: "Rendez-vous de suivi",
  },
  {
    id: "3",
    nom: "Urgence",
    couleur: "#ef4444",
    description: "Consultation d'urgence",
  },
]

export function PatientVisitCalendar() {
  const showNotification = useCalendarStore((state:any) => state.showNotification)

  const handleBookAppointment = (appointment: RendezVousType) => {
    console.log("Nouveau rendez-vous créé:", appointment)
    showNotification(`Rendez-vous pris avec succès pour ${appointment.meta?.patientName || "le patient"} !`, "success")
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Prise de Rendez-vous Médical</h1>
          <p className="text-lg opacity-80">Sélectionnez une date et un créneau pour prendre rendez-vous</p>
        </div>

        <MedicalBookingCalendar
          medecinId="medecin-123"
          typesRendezVous={typesRendezVous}
          onBookAppointment={handleBookAppointment}
        />
      </div>
    </div>
  )
}

