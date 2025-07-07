"use client"

import { useState } from "react"

export interface BookingFormData {
  patientId: string
  motif: string
  typeRendezVous: string
  notes: string
}

export function useBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    patientId: "",
    motif: "",
    typeRendezVous: "",
    notes: "",
  })

  const updateField = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      patientId: "",
      motif: "",
      typeRendezVous: "",
      notes: "",
    })
  }

  const isFormValid = formData.patientId.trim() !== "" && formData.motif.trim() !== ""

  return {
    formData,
    updateField,
    resetForm,
    isFormValid,
  }
}
