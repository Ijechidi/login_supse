"use client"
import { AvailabilityManager } from "../components/availability/availability-manager"
import { useState } from "react"
import React from "react"

/**
 * Composant parent pour la sélection et gestion des disponibilités du médecin
 */
export default function DisponibiliteSelector({ medecinId, selectedDate: selectedDateProp }: { medecinId: string, selectedDate?: Date | null }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(selectedDateProp || null)

  // Synchroniser la date si elle vient du parent
  React.useEffect(() => {
    if (selectedDateProp !== undefined) {
      setSelectedDate(selectedDateProp)
    }
  }, [selectedDateProp])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Gérer mes disponibilités</h2>
      {/* Sélecteur de date */}
      <label htmlFor="date-selector" className="block text-sm font-medium text-gray-700">Sélectionner une date</label>
      <input
        id="date-selector"
        type="date"
        className="border rounded px-2 py-1"
        value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
        onChange={e => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
        placeholder="Choisir une date"
        title="Sélectionner une date"
      />
      {/* Gestionnaire de disponibilités */}
      <AvailabilityManager medecinId={medecinId} selectedDate={selectedDate} />
    </div>
  )
}
