"use client"

import { useState, useCallback, useMemo } from "react"
import { Plus, Clock, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface AddTimeSlotProps {
  onAddSlot: (heureDebut: string, heureFin: string) => void
  disabled?: boolean
}

export default function AddTimeSlot({ onAddSlot, disabled = false }: AddTimeSlotProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [heureDebut, setHeureDebut] = useState("")
  const [heureFin, setHeureFin] = useState("")
  const [errors, setErrors] = useState<{ debut?: string; fin?: string }>({})

  const timeSuggestions = useMemo(
    () => [
      { label: "1h", debut: "09:00", fin: "10:00" },
      { label: "2h", debut: "14:00", fin: "16:00" },
      { label: "Matinée", debut: "08:00", fin: "12:00" },
      { label: "Après-midi", debut: "14:00", fin: "18:00" },
    ],
    []
  )

  const validateTimes = useCallback(() => {
    const newErrors: { debut?: string; fin?: string } = {}

    if (!heureDebut) newErrors.debut = "Heure de début requise"
    if (!heureFin) newErrors.fin = "Heure de fin requise"

    if (heureDebut && heureFin) {
      const [sh, sm] = heureDebut.split(":").map(Number)
      const [eh, em] = heureFin.split(":").map(Number)
      const start = sh * 60 + sm
      const end = eh * 60 + em

      if (end <= start) newErrors.fin = "L'heure de fin doit être après le début"
      const duration = end - start
      if (duration < 30) newErrors.fin = "Durée minimale : 30 minutes"
      if (duration > 240) newErrors.fin = "Durée maximale : 4 heures"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [heureDebut, heureFin])

  const handleSubmit = useCallback(() => {
    if (validateTimes()) {
      onAddSlot(heureDebut, heureFin)
      handleCancel()
    }
  }, [heureDebut, heureFin, validateTimes, onAddSlot])

  const handleCancel = useCallback(() => {
    setIsExpanded(false)
    setHeureDebut("")
    setHeureFin("")
    setErrors({})
  }, [])

  const duration = useMemo(() => {
    if (!heureDebut || !heureFin) return null
    const [sh, sm] = heureDebut.split(":").map(Number)
    const [eh, em] = heureFin.split(":").map(Number)
    const start = sh * 60 + sm
    const end = eh * 60 + em
    if (end <= start) return null
    const total = end - start
    const h = Math.floor(total / 60)
    const m = total % 60
    return h > 0 ? `${h}h${m.toString().padStart(2, "0")}` : `${m}min`
  }, [heureDebut, heureFin])

  const applySuggestion = useCallback((debut: string, fin: string) => {
    setHeureDebut(debut)
    setHeureFin(fin)
    setErrors({})
  }, [])

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
          Ajouter un créneau
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
            <h4 className="font-semibold text-foreground">Nouveau créneau</h4>
            {duration && (
              <div className="ml-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                Durée: {duration}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Heure de début</label>
              <Input
                type="time"
                value={heureDebut}
                onChange={(e) => {
                  setHeureDebut(e.target.value)
                  if (errors.debut) setErrors((prev) => ({ ...prev, debut: undefined }))
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
                  if (errors.fin) setErrors((prev) => ({ ...prev, fin: undefined }))
                }}
                className={errors.fin ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.fin && <p className="text-xs text-destructive">{errors.fin}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-muted-foreground">Suggestions :</span>
            {timeSuggestions.map(({ label, debut, fin }) => (
              <button
                key={label}
                onClick={() => applySuggestion(debut, fin)}
                className="bg-muted px-2 py-1 rounded-md hover:bg-muted/60 text-muted-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCancel} className="flex-1">
              <X className="h-3 w-3 mr-1" />
              Annuler
            </Button>
            <Button type="button" size="sm" onClick={handleSubmit} disabled={!heureDebut || !heureFin} className="flex-1">
              <Check className="h-3 w-3 mr-1" />
              Ajouter
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
