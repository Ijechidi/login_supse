"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { User as UserIcon } from "lucide-react";
import { RENDEZ_VOUS_TYPES } from "@/lib/constant/rendezvous";
import { useCreatePatientRendezVous } from '@/hooks/useCreatePatientRendezVous';
import { useAuth } from '@/providers/AuthProvider';
import { useParams } from 'next/navigation';
import { TypeRendezVousEnum } from '@/types/rendezVous';

interface BookingModalPatientProps {
  name: string;
  email: string;
  selectedDate?: Date | null;
  selectedTime?: string | null;
  onSubmit?: (data: { motif: string; notes: string; typeRendezVous: string; date: Date | null; time: string | null }) => void;
}

export function BookingModalPatient({
  name,
  email,
  selectedDate,
  selectedTime,
  onSubmit,
}: BookingModalPatientProps) {
  const [open, setOpen] = useState(false);
  const [motif, setMotif] = useState("");
  const [notes, setNotes] = useState("");
  const [typeRendezVous, setTypeRendezVous] = useState("");
  const { user } = useAuth();
  const params = useParams();
  const medecinId = typeof params?.medecinId === 'string' ? params.medecinId : Array.isArray(params?.medecinId) ? params.medecinId[0] : undefined;
  const { createPatientRendezVous, loading, error, success } = useCreatePatientRendezVous();
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        onSubmit={async e => {
          e.preventDefault();
          setFeedback(null);
          console.log({
            patientId: user?.id,
            medecinId,
            selectedDate,
            selectedTime,
            motif,
            typeRendezVous
          });
          if (!user?.id || !medecinId || !selectedDate || !selectedTime || !typeRendezVous) {
            setFeedback("Informations manquantes pour la création du rendez-vous.");
            return;
          }
          const [hours, minutes] = selectedTime.split(":").map(Number);
          const dateDebut = new Date(selectedDate);
          dateDebut.setHours(hours, minutes, 0, 0);
          const dateFin = new Date(dateDebut);
          dateFin.setHours(hours + 1, minutes, 0, 0);
          try {
            await createPatientRendezVous({
              patientId: user.id,
              medecinId,
              dateDebut,
              dateFin,
              motif,
              type: (typeRendezVous.toUpperCase() as TypeRendezVousEnum) || TypeRendezVousEnum.CONSULTATION,
              meta: { notes },
            });
            setFeedback("Rendez-vous créé avec succès !");
            setOpen(false);
          } catch (e) {
            setFeedback("Erreur lors de la création du rendez-vous.");
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Prendre rendez-vous</DialogTitle>
            <DialogDescription>
              {selectedDate && selectedTime
                ? `Le ${selectedDate.toLocaleDateString("fr-FR")} à ${selectedTime}`
                : "Choisissez une date et une heure"}
            </DialogDescription>
            <div className="px-3 py-2 text-center rounded  text-muted-foreground">
              {email}
            </div>
            {feedback && (
              <div className={success ? "text-green-600" : "text-red-600"}>{feedback}</div>
            )}
          </DialogHeader>

          <div className="space-y-4">
            {/* Nom affiché en lecture seule */}
            <div>
              <Label>Nom du Patient</Label>
              <div className="px-3 py-2 border rounded bg-muted text-muted-foreground">
                {name}
              </div>
            </div>

            {/* Type de rendez-vous */}
            <div>
              <Label htmlFor="typeRendezVous">Type de rendez-vous</Label>
              <Select
                value={typeRendezVous}
                onValueChange={setTypeRendezVous}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  {( RENDEZ_VOUS_TYPES).map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Motif */}
            <div>
              <Label htmlFor="motif">Motif de consultation</Label>
              <Input
                id="motif"
                value={motif}
                onChange={e => setMotif(e.target.value)}
                placeholder="Ex: Consultation générale"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="pt-4 gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" >
              Confirmer le rendez-vous
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
