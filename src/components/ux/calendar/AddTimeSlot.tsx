"use client"

import { useState } from "react"
import { Plus, Clock, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { useAddDisponibilites } from "@/hooks/useAddDisponibilites"

interface AddTimeSlotProps {
  medecinId: string;
  date: Date;
  existingSlots?: { heureDebut: Date; heureFin: Date }[]
  disabled?: boolean
}

export default function AddTimeSlot({ medecinId, date, existingSlots = [], disabled = false }: AddTimeSlotProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const {
    heureDebut,
    heureFin,
    duree,
    isMultipleSlots,
    errors,
    loading,
    setHeureDebut,
    setHeureFin,
    setDuree,
    setIsMultipleSlots,
    handleGenerate,
    resetForm,
    clearError,
  } = useAddDisponibilites({ medecinId, date });

  const handleCancel = () => {
    setIsExpanded(false);
    resetForm();
  };

  const handleSubmit = () => {
    handleGenerate();
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => setIsExpanded(true)}
          disabled={disabled}
          variant="outline"
          className="rounded-full border-dashed border-muted text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter des créneaux
        </Button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        className="rounded-xl border border-muted bg-muted/30 p-4"
        initial={{ opacity: 0, height: 0, scale: 0.95 }}
        animate={{ opacity: 1, height: "auto", scale: 1 }}
        exit={{ opacity: 0, height: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <h4 className="font-semibold text-foreground">Ajouter des créneaux horaires</h4>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="multiple-slots"
              checked={isMultipleSlots}
              onCheckedChange={(checked) => setIsMultipleSlots(checked as boolean)}
            />
            <label
              htmlFor="multiple-slots"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Créer plusieurs créneaux (places horaires)
            </label>
          </div>

          <div className="flex gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Heure de début</label>
              <Input
                type="time"
                value={heureDebut}
                onChange={(e) => {
                  setHeureDebut(e.target.value)
                  clearError('debut')
                }}
                className={errors.debut ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.debut && <p className="text-xs text-destructive">{errors.debut}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Heure de fin</label>
              <Input
                type="time"
                value={heureFin}
                onChange={(e) => {
                  setHeureFin(e.target.value)
                  clearError('fin')
                }}
                className={errors.fin ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.fin && <p className="text-xs text-destructive">{errors.fin}</p>}
            </div>
            {isMultipleSlots && (
              <div className=" space-y-1 w-16 ">
                <label className="text-xs font-medium text-muted-foreground">Durée(min)</label>
                <Input
                  type="number"
                  min={15}
                  step={15}
                  value={duree}
                  onChange={e => setDuree(Number(e.target.value))}
                  className={errors.duree ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.duree && <p className="text-xs text-destructive">{errors.duree}</p>}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCancel} className="flex-1">
              <X className="h-3 w-3 mr-1" />
              Annuler
            </Button>
            <Button type="button" size="sm" onClick={handleSubmit} disabled={loading} className="flex-1">
              <Check className="h-3 w-3 mr-1" />
              {isMultipleSlots ? "Générer les créneaux" : "Créer le créneau"}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
