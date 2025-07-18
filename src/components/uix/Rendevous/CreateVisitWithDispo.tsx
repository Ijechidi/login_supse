"use client";

import { useState } from "react";
import { useCreateDispoRendezVous } from "@/hooks/useCreateDispoRendezVous";
import { TypeRendezVousEnum } from "@/types/rendezVous";
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

export function CreateVisitWithDispo({ disponibiliteId }: { disponibiliteId: string }) {
  const [motif, setMotif] = useState("");
  const [type, setType] = useState<TypeRendezVousEnum | undefined>(undefined);
  const mutation = useCreateDispoRendezVous();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !motif) return;

    mutation.mutate({ disponibiliteId, motif, type });
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold">Prendre un rendez-vous</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Sélection du type de rendez-vous */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="type" className="text-sm">Type de rendez-vous</Label>
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
          <Label htmlFor="motif" className="text-sm">Motif</Label>
          <Textarea
            id="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            required
            rows={3}
            placeholder="Décrivez brièvement le motif de votre consultation"
          />
        </div>

        {/* Bouton */}
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? "Création..." : "Créer le rendez-vous"}
        </Button>

        {/* Feedback */}
        {mutation.isSuccess && (
          <p className="text-green-600 text-sm text-center pt-1">
            ✅ Rendez-vous créé avec succès !
          </p>
        )}
        {mutation.isError && (
          <p className="text-red-500 text-sm text-center pt-1">
            ❌ Une erreur est survenue.
          </p>
        )}
      </form>
    </div>
  );
}
