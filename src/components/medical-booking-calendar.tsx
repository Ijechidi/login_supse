"use client"

import { useState, useCallback, useEffect } from "react"
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
import { useAuth } from "@/providers/AuthProvider"
import { useDisponibilites } from "@/hooks/useDisponibilites";
import { useRendezVous } from "@/hooks/useRendezVous";

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
 const {user} = useAuth()
  // Store global
  const showNotification = useCalendarStore((state:any) => state.showNotification)

  // Hooks
  const { appointments, addAppointment, updateAppointment } = useAppointments()
  const { currentDate, selectedDate, setSelectedDate, calendarDays, timeSlots, navigateMonth } =
    useCalendar(appointments)
  const { formData, updateField, resetForm, isFormValid } = useBookingForm()
  const { disponibilites, loading: loadingDispos, fetchDisponibilites } = useDisponibilites(medecinId);
  // Ajout hook rendez-vous
  const selectedDateStr = selectedDate ? selectedDate.toISOString().slice(0, 10) : undefined;
  const { rendezVous, loading: loadingRdv, fetchRendezVous, create } = useRendezVous(medecinId, selectedDateStr);

  useEffect(() => {
    if (selectedDateStr) fetchRendezVous();
  }, [selectedDateStr, fetchRendezVous]);

  // Mapper les disponibilités en créneaux horaires pour le jour sélectionné
  const filteredSlots = selectedDate
    ? disponibilites.filter(d => {
        const dJour = new Date(d.jour).toISOString().slice(0, 10);
        const sJour = selectedDate.toISOString().slice(0, 10);
        return dJour === sJour;
      }).map(d => {
        const rdv = rendezVous.find(r => {
          const rdvDebut = new Date(r.dateDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const dispoDebut = new Date(d.heureDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return rdvDebut === dispoDebut;
        });
        return {
          time: new Date(d.heureDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          available: !rdv,
          rendezVous: rdv,
        };
      })
    : [];

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

  // Réservation réelle
  const handleTimeSlotSelect = async (slot: any) => {
    if (!slot.available || !selectedDate) return;
    // TODO: récupérer patientId réel
    const patientId = "patient-1";
    const typeId = typesRendezVous[0]?.id || "consultation";
    const [hours, minutes] = slot.time.split(":").map(Number);
    const dateDebut = new Date(selectedDate);
    dateDebut.setHours(hours, minutes, 0, 0);
    const dateFin = new Date(dateDebut);
    dateFin.setHours(hours + 1, minutes, 0, 0);
    await create({
      patientId,
      medecinId,
      dateDebut,
      dateFin,
      motif: "Consultation",
      statut: "en_attente",
      typeId,
    });
    fetchRendezVous();
    fetchDisponibilites();
    showNotification("Rendez-vous réservé !", "success");
  };

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
    <div className=" w-full  mx-auto p-0">
      <div className="flex  flex-col md:flex-row gap-4">
        {/* Calendrier */}
        <div className="flex-1">
          <CalendarCard
            currentDate={currentDate}
            days={calendarDays}
            selectedDate={selectedDate}
            onNavigate={navigateMonth}
            onDaySelect={handleDaySelect}
            onDayHover={setHoveredDay}
          />
        </div>

        {/* s affichera si l user role = "PATIENT" */}

        {user?.role.toUpperCase() === "PATIENT" && (
        <div className="max-w-md">
          <TimeSlotList
            selectedDate={selectedDate}
            timeSlots={filteredSlots}
            typesRendezVous={typesRendezVous}
            onTimeSlotSelect={handleTimeSlotSelect}
            onViewAppointmentDetails={handleViewAppointmentDetails}
          />
        </div>
      
      )}

        {/* ... reste inchangé ... */}


          {user?.role.toUpperCase() === "MEDECIN" && (
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
        )}
    

           
              

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
