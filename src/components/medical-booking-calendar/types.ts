import type { RendezVousType, TypeRendezVous } from "@/types/rendezVous";

export interface MedicalBookingCalendarProps {
  medecinId: string;
  typesRendezVous: TypeRendezVous[];
  onBookAppointment?: (appointment: RendezVousType) => void;
}

export interface MedicalBookingCalendarState {
  selectedTimeSlot: string | null;
  showBookingForm: boolean;
  hoveredDay: string | null;
  selectedAppointment: RendezVousType | null;
  showAppointmentDetails: boolean;
}