"use client"

import { useState, useCallback, useMemo } from "react"
import { Plus, Calendar, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AvailabilitySlot } from "./availability-slot"
import AddTimeSlot from "./AddTimeSlot"
import { useAvailability } from "@/hooks/use-availability"
import { useCalendarStore } from "@/store/use-calendar-store"
import type { RendezVousType } from "@/types/rendezVous"

interface AvailabilityManagerProps {
  medecinId: string
  selectedDate: Date | null
  appointments: RendezVousType[]
  onModifyAppointment?: (appointment: RendezVousType) => void
  onCancelAppointment?: (appointment: RendezVousType) => void
}

/**
 * Composant de gestion des disponibilités du médecin
 * Permet d'ajouter, modifier et supprimer des créneaux de disponibilité
 */
export function AvailabilityManager({
  medecinId,
  selectedDate,
  appointments,
  onModifyAppointment,
  onCancelAppointment,
}: AvailabilityManagerProps) {
  // États locaux
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingSlot, setEditingSlot] = useState<string | null>(null)
  const [newSlot, setNewSlot] = useState({ heureDebut: "", heureFin: "" })

  // Store global
  const showNotification = useCalendarStore((state) => state.showNotification)

  // Hook de gestion des disponibilités
  const { templates, getDetailedSlotsForDate, addAvailability, removeAvailability, updateAvailability, applyTemplate } =
    useAvailability(medecinId, appointments)

  // Récupération des créneaux pour la date sélectionnée
  const detailedSlots = useMemo(
    () => (selectedDate ? getDetailedSlotsForDate(selectedDate) : []),
    [selectedDate, getDetailedSlotsForDate],
  )

  /**
   * Gère l'ajout d'un créneau via le modal principal
   */
  const handleAddSlotFromDialog = useCallback(() => {
    if (!selectedDate || !newSlot.heureDebut || !newSlot.heureFin) return

    addAvailability({
      medecinId,
      date: selectedDate,
      heureDebut: newSlot.heureDebut,
      heureFin: newSlot.heureFin,
      isAvailable: true,
    })

    showNotification("Créneau ajouté avec succès", "success")
    setNewSlot({ heureDebut: "", heureFin: "" })
    setShowAddDialog(false)
  }, [selectedDate, newSlot, medecinId, addAvailability, showNotification])

  /**
   * Gère l'ajout rapide d'un créneau via le composant AddTimeSlot
   */
  const handleAddSlotQuick = useCallback(
    (heureDebut: string, heureFin: string) => {
      if (!selectedDate) return

      addAvailability({
        medecinId,
        date: selectedDate,
        heureDebut,
        heureFin,
        isAvailable: true,
      })

      showNotification("Créneau rapide ajouté", "success")
    },
    [selectedDate, medecinId, addAvailability, showNotification],
  )

  /**
   * Applique un modèle de disponibilité prédéfini
   */
  const handleApplyTemplate = useCallback(
    (templateId: string) => {
      if (!selectedDate) return
      applyTemplate(templateId, selectedDate)
      showNotification(`Modèle appliqué avec succès`, "success")
    },
    [selectedDate, applyTemplate, showNotification],
  )

  /**
   * Gère l'édition d'un créneau existant
   */
  const handleEditSlot = useCallback((id: string) => {
    setEditingSlot(id)
    // TODO: Implémenter la logique d'édition complète
  }, [])

  /**
   * Gère la suppression d'un créneau
   */
  const handleDeleteSlot = useCallback(
    (id: string) => {
      const slot = detailedSlots.find((s) => s.id === id)
      if (slot) {
        removeAvailability(slot.availabilityId)
        showNotification("Créneau supprimé", "info")
      }
    },
    [detailedSlots, removeAvailability, showNotification],
  )

  return (
<div className="space-y-6">
  {/* En-tête */}
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
        <Clock className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">
          {selectedDate
            ? `Disponibilités du ${selectedDate.toLocaleDateString("fr-FR")}`
            : "Gestion des disponibilités"}
        </h3>
        {selectedDate && (
          <p className="text-sm text-muted-foreground">
            Configurez vos créneaux de disponibilité pour cette date
          </p>
        )}
      </div>
    </div>
  </div>

  {selectedDate ? (
    <div className="space-y-6">
      {/* Actions rapides */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un créneau
        </Button>

        <Select onValueChange={handleApplyTemplate}>
          <SelectTrigger className="w-48">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <SelectValue placeholder="Modèles rapides" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Liste des créneaux */}
      <div className="space-y-3">
        {detailedSlots.length > 0 ? (
          <div className="space-y-3">
            {detailedSlots.map((slot) => (
              <AvailabilitySlot
                key={slot.id}
                id={slot.id}
                heureDebut={slot.heureDebut}
                heureFin={slot.heureFin}
                isOccupied={slot.isOccupied}
                isAvailable={slot.isAvailable}
                appointment={slot.appointment}
                onEdit={handleEditSlot}
                onDelete={handleDeleteSlot}
                onModifyAppointment={onModifyAppointment}
                onCancelAppointment={onCancelAppointment}
              />
            ))}
            <AddTimeSlot onAddSlot={handleAddSlotQuick} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-dashed p-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Aucun créneau configuré</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Commencez par ajouter votre premier créneau de disponibilité
              </p>
            </div>
            <AddTimeSlot onAddSlot={handleAddSlotQuick} />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold text-foreground">Sélectionnez une date</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Choisissez une date dans le calendrier pour gérer les disponibilités
      </p>
    </div>
  )}

  {/* Dialog d'ajout de créneau */}
  <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Ajouter un créneau
        </DialogTitle>
        <DialogDescription>
          Définissez les heures de début et de fin pour le nouveau créneau
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="heureDebut">Heure de début</Label>
            <Input
              id="heureDebut"
              type="time"
              value={newSlot.heureDebut}
              onChange={(e) => setNewSlot((prev) => ({ ...prev, heureDebut: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heureFin">Heure de fin</Label>
            <Input
              id="heureFin"
              type="time"
              value={newSlot.heureFin}
              onChange={(e) => setNewSlot((prev) => ({ ...prev, heureFin: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
            Annuler
          </Button>
          <Button onClick={handleAddSlotFromDialog} className="flex-1">
            Ajouter le créneau
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</div>

  )
}
