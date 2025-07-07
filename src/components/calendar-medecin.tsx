"use client"

import { useState, useCallback } from "react"
import { CalendarCard } from "./calendar/calendar-card"
import { TimeSlotList } from "./time-slots/time-slot-list"
import { AppointmentTabs } from "./appointments/appointment-tabs"
import { AppointmentDetailModal } from "./appointments/appointment-detail-modal"
import { BookingDialog } from "./booking/booking-dialog"
import { Notifications } from "@/components/ui/notifications"
import { useCalendar } from "../hooks/use-calendar"
import { useBookingForm } from "../hooks/use-booking-form"
import { useAppointments } from "../hooks/use-appointments"
import { useCalendarStore } from "../store/use-calendar-store"
import type { RendezVousType, TypeRendezVous } from "@/types/rendezVous"

interface MedicalBookingCalendarProps {
  medecinId: string
  typesRendezVous: TypeRendezVous[]
  onBookAppointment?: (appointment: RendezVousType) => void
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
  // États locaux
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<RendezVousType | null>(null)
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false)

  // Store global
  const showNotification = useCalendarStore((state:any) => state.showNotification)

  // Hooks
  const { appointments, addAppointment, updateAppointment } = useAppointments()
  const { currentDate, selectedDate, setSelectedDate, calendarDays, timeSlots, navigateMonth } =
    useCalendar(appointments)
  const { formData, updateField, resetForm, isFormValid } = useBookingForm()

  /**
   * Gère la sélection d'un jour dans le calendrier
   */
  const handleDaySelect = useCallback(
    (dayData: any) => {
      if (dayData.isCurrentMonth) {
        setSelectedDate(dayData.date)
        setSelectedTimeSlot(null)
      }
    },
    [setSelectedDate],
  )

  /**
   * Gère la sélection d'un créneau horaire
   */
  const handleTimeSlotSelect = useCallback((timeSlot: any) => {
    if (timeSlot.available) {
      setSelectedTimeSlot(timeSlot.time)
      setShowBookingForm(true)
    }
  }, [])

  /**
   * Gère l'affichage des détails d'un rendez-vous
   */
  const handleViewAppointmentDetails = useCallback((timeSlot: any) => {
    if (timeSlot.rendezVous) {
      setSelectedAppointment(timeSlot.rendezVous)
      setShowAppointmentDetails(true)
    }
  }, [])

  /**
   * Gère la soumission d'un nouveau rendez-vous
   */
  const handleBookingSubmit = useCallback(() => {
    if (!selectedDate || !selectedTimeSlot) return

    const [hours, minutes] = selectedTimeSlot.split(":").map(Number)
    const dateDebut = new Date(selectedDate)
    dateDebut.setHours(hours, minutes, 0, 0)

    const dateFin = new Date(dateDebut)
    dateFin.setHours(hours + 1, minutes, 0, 0)

    const newAppointmentData: Omit<RendezVousType, "id" | "createdAt"> = {
      patientId: formData.patientId,
      medecinId,
      dateDebut,
      dateFin,
      motif: formData.motif,
      statut: "en_attente",
      meta: {
        typeRendezVous: formData.typeRendezVous,
        notes: formData.notes,
        patientName: `Patient ${formData.patientId}`,
        phone: "06 XX XX XX XX",
      },
    }

    const createdAppointment = addAppointment(newAppointmentData)
    onBookAppointment?.(createdAppointment)
    showNotification("Rendez-vous créé avec succès", "success")
    handleBookingCancel()
  }, [selectedDate, selectedTimeSlot, formData, medecinId, addAppointment, onBookAppointment, showNotification])

  /**
   * Réinitialise le formulaire de réservation
   */
  const handleBookingCancel = useCallback(() => {
    setShowBookingForm(false)
    resetForm()
    setSelectedTimeSlot(null)
  }, [resetForm])

  /**
   * Gère l'édition d'un rendez-vous existant
   */
  const handleEditAppointment = useCallback(
    (appointment: RendezVousType) => {
      console.log("Éditer le rendez-vous:", appointment)
      setShowAppointmentDetails(false)
      showNotification("Mode édition activé", "info")
    },
    [showNotification],
  )

  /**
   * Gère l'annulation d'un rendez-vous
   */
  const handleCancelAppointment = useCallback(
    (appointment: RendezVousType) => {
      updateAppointment(appointment.id, { statut: "annule" })
      setShowAppointmentDetails(false)
      showNotification("Rendez-vous annulé", "info")
    },
    [updateAppointment, showNotification],
  )

  /**
   * Gère la modification d'un rendez-vous depuis les disponibilités
   */
  const handleModifyAppointment = useCallback((appointment: RendezVousType) => {
    setSelectedAppointment(appointment)
    setShowAppointmentDetails(true)
  }, [])

  return (
    <div className=" w-screen mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendrier */}
        <div className="lg:col-span-1">
          <CalendarCard
            currentDate={currentDate}
            days={calendarDays}
            selectedDate={selectedDate}
            onNavigate={navigateMonth}
            onDaySelect={handleDaySelect}
            onDayHover={setHoveredDay}
          />
        </div>

        {/* Créneaux horaires */}
        <div className="lg:col-span-1">
          <TimeSlotList
            selectedDate={selectedDate}
            timeSlots={timeSlots}
            typesRendezVous={typesRendezVous}
            onTimeSlotSelect={handleTimeSlotSelect}
            onViewAppointmentDetails={handleViewAppointmentDetails}
          />
        </div>

        {/* Onglets : Rendez-vous et Disponibilités pour le medecin uniquement a ne pas afficher au patient */}
        <div className="lg:col-span-1">
          <AppointmentTabs
            appointments={appointments}
            typesRendezVous={typesRendezVous}
            selectedDate={selectedDate}
            hoveredDay={hoveredDay}
            medecinId={medecinId}
            onModifyAppointment={handleModifyAppointment}
            onCancelAppointment={handleCancelAppointment}
          />
        </div>
      </div>

      {/* Dialog de réservation */}
      <BookingDialog
        open={showBookingForm}
        onOpenChange={setShowBookingForm}
        selectedDate={selectedDate}
        selectedTime={selectedTimeSlot}
        formData={formData}
        onFormUpdate={updateField}
        onSubmit={handleBookingSubmit}
        onCancel={handleBookingCancel}
        typesRendezVous={typesRendezVous}
        isFormValid={isFormValid}
      />

      {/* Modal des détails du rendez-vous */}
      <AppointmentDetailModal
        appointment={selectedAppointment}
        typesRendezVous={typesRendezVous}
        open={showAppointmentDetails}
        onOpenChange={setShowAppointmentDetails}
        onEdit={handleEditAppointment}
        onCancel={handleCancelAppointment}
      />

      {/* Système de notifications */}
      <Notifications />
    </div>
  )
}
