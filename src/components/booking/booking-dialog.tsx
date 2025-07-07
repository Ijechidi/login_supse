"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import type { BookingFormData } from "@/hooks/use-booking-form"
import type { TypeRendezVous } from "@/types/rendezVous"
import { User } from "@supabase/supabase-js"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date | null
  selectedTime: string | null
  formData: BookingFormData
  onFormUpdate: (field: keyof BookingFormData, value: string) => void
  onSubmit: () => void
  onCancel: () => void
  typesRendezVous: TypeRendezVous[]
  isFormValid: boolean
}

export function BookingDialog({
  open,
  onOpenChange,
  selectedDate,
  selectedTime,
  formData,
  onFormUpdate,
  onSubmit,
  onCancel,
  typesRendezVous,
  isFormValid,
}: BookingDialogProps) {
  const [user, setuser] = useState<User>()
  const supabase = createClient()

  // ✅ Récupérer l'utilisateur connecté (client-safe)
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        setuser(data.user)
        onFormUpdate("patientId", data.user.id)
      }
    }

    getUser()
  }, [onFormUpdate, supabase])


  const email= user?.email




  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Prendre rendez-vous</DialogTitle>
          <DialogDescription>
            {selectedDate && selectedTime && `Le ${selectedDate.toLocaleDateString("fr-FR")} à ${selectedTime}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Affichage du nom d'utilisateur à la place de l'input patientId */}
          <div>
            <Label>Nom du Patient</Label>
            <div className="px-3 py-2 border rounded bg-muted text-muted-foreground">
              {email ? email.split("@")[0] : "Utilisateur"}
            </div>
          </div>

          {/* Type de rendez-vous */}
          <div>
            <Label htmlFor="typeRendezVous">Type de rendez-vous</Label>
            <Select
              value={formData.typeRendezVous}
              onValueChange={(value) => onFormUpdate("typeRendezVous", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                {typesRendezVous.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="motif">Motif de consultation</Label>
            <Input
              id="motif"
              value={formData.motif}
              onChange={(e) => onFormUpdate("motif", e.target.value)}
              placeholder="Ex: Consultation générale"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => onFormUpdate("notes", e.target.value)}
              placeholder="Informations complémentaires..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Annuler
            </Button>
            <Button onClick={onSubmit} className="flex-1" disabled={!isFormValid}>
              Confirmer le rendez-vous
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
