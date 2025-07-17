// import { RendezVousType } from "@/types/rendezVous"
// import { useCallback } from "react"

//   /**
//    * Gère l'édition d'un rendez-vous existant
//    */
//   const handleEditAppointment = useCallback(
//     (appointment: RendezVousType) => {
//       console.log("Éditer le rendez-vous:", appointment)
//       setShowAppointmentDetails(false)
//       showNotification("Mode édition activé", "info")
//     },
//     [showNotification],
//   )

//   /**
//    * Gère l'annulation d'un rendez-vous
//    */
//   const handleCancelAppointment = useCallback(
//     (appointment: RendezVousType) => {
//       updateAppointment(appointment.id, { statut: "annule" })
//       setShowAppointmentDetails(false)
//       showNotification("Rendez-vous annulé", "info")
//     },
//     [updateAppointment, showNotification],
//   )

//   /**
//    * Gère la modification d'un rendez-vous depuis les disponibilités
//    */
//   const handleModifyAppointment = useCallback((appointment: RendezVousType) => {
//     setSelectedAppointment(appointment)
//     setShowAppointmentDetails(true)
//   }, [])