"use client"

import { useState, useCallback, useMemo } from "react"
import { Plus, Clock, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useDisponibilites } from '@/hooks/useDisponibilites'

interface AddTimeSlotProps {
  medecinId: string;
  date: Date;
  existingSlots?: { heureDebut: Date; heureFin: Date }[]
  disabled?: boolean
}

function generateDisponibilites({
  medecinId,
  date,
  heureDebut,
  heureFin,
  dureeMinutes,
}: {
  medecinId: string;
  date: Date;
  heureDebut: string;
  heureFin: string;
  dureeMinutes: number;
}) {
  const [hStart, mStart] = heureDebut.split(":").map(Number);
  const [hEnd, mEnd] = heureFin.split(":").map(Number);

  const startTime = new Date(date);
  startTime.setHours(hStart, mStart, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(hEnd, mEnd, 0, 0);

  const slots: {
    heureDebut: Date;
    heureFin: Date;
    medecinId: string;
    status: "LIBRE";
  }[] = [];

  let current = new Date(startTime);
  while (current < endTime) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current.getTime() + dureeMinutes * 60 * 1000);

    if (slotEnd > endTime) break;

    slots.push({
      heureDebut: slotStart,
      heureFin: slotEnd,
      medecinId,
      status: "LIBRE",
    });

    current = slotEnd;
  }

  return slots;
}

export default function AddTimeSlot({ medecinId, date, existingSlots = [], disabled = false }: AddTimeSlotProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [heureDebut, setHeureDebut] = useState("")
  const [heureFin, setHeureFin] = useState("")
  const [duree, setDuree] = useState(60) // minutes
  const [errors, setErrors] = useState<{ debut?: string; fin?: string; duree?: string }>({})
  const { createDisponibilite, loading } = useDisponibilites({ medecinId })

  const validate = useCallback(() => {
    const newErrors: { debut?: string; fin?: string; duree?: string } = {}
    if (!heureDebut) newErrors.debut = "Heure de début requise"
    if (!heureFin) newErrors.fin = "Heure de fin requise"
    if (!duree || duree < 15) newErrors.duree = "Durée minimale : 15 minutes"
    if (heureDebut && heureFin) {
      const [sh, sm] = heureDebut.split(":").map(Number)
      const [eh, em] = heureFin.split(":").map(Number)
      const start = sh * 60 + sm
      const end = eh * 60 + em
      if (end <= start) newErrors.fin = "L'heure de fin doit être après le début"
      if (end - start < duree) newErrors.duree = "Durée trop longue pour l'intervalle"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [heureDebut, heureFin, duree])

  const handleGenerate = useCallback(() => {
    if (!validate()) return
    const slots = generateDisponibilites({
      medecinId,
      date,
      heureDebut,
      heureFin,
      dureeMinutes: duree,
    })
    slots.forEach(slot => {
      createDisponibilite.mutate({
        medecinId,
        heureDebut: slot.heureDebut,
        heureFin: slot.heureFin,
        meta: {},
      })
    })
    setIsExpanded(false)
    setHeureDebut("")
    setHeureFin("")
    setDuree(60)
    setErrors({})
  }, [heureDebut, heureFin, duree, medecinId, date, createDisponibilite, validate])

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

          <div className="grid grid-cols-3 gap-3">
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
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Durée (min)</label>
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
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsExpanded(false)} className="flex-1">
              <X className="h-3 w-3 mr-1" />
              Annuler
            </Button>
            <Button type="button" size="sm" onClick={handleGenerate} disabled={loading} className="flex-1">
              <Check className="h-3 w-3 mr-1" />
              Générer les créneaux
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
