"use client";

import { useState, useEffect } from "react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TypeRendezVousEnum } from "@prisma/client";
import { useCreateDispoRendezVous } from "@/hooks/useCreateDispoRendezVous";

export function CreateVisitWithDispo({
  disponibiliteId,
  onSuccess,
}: {
  disponibiliteId: string;
  onSuccess?: () => void;
}) {
  const [motif, setMotif] = useState("");
  const [type, setType] = useState<TypeRendezVousEnum | undefined>(undefined);
  const { createDispoRendezVous, isPending, isSuccess } = useCreateDispoRendezVous();

  useEffect(() => {
    if (isSuccess) {
      setMotif("");
      setType(undefined);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    }
  }, [isSuccess, onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !motif) return;
    createDispoRendezVous({ disponibiliteId, motif, type });
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Prendre un rendez-vous</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Sélection du type de rendez-vous */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="type" className="text-sm">
            Type de rendez-vous
          </Label>
          <Select
            value={type}
            onValueChange={(v) => setType(v as TypeRendezVousEnum)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Choisissez un type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TypeRendezVousEnum).map((val) => (
                <SelectItem key={val} value={val}>
                  {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Saisie du motif */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="motif" className="text-sm">
            Motif
          </Label>
          <Textarea
            id="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            required
            rows={3}
            placeholder="Décrivez brièvement le motif de votre consultation"
          />
        </div>
<div>{onSuccess? "Rendez-vous créé avec succes" : "cet horraire n'est pas disponible"}</div>
        {/* Bouton */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Création..." : "Créer le rendez-vous"}
        </Button>
      </form>
    </div>
  );
}