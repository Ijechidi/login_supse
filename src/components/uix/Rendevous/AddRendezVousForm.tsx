"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRendezVousForm } from "@/hooks/useRendezVousForm";
import { TypeRendezVousEnum } from "@/types/rendezVous";

type Props = {
  medecinId: string;
  patientId: string;
};

export function AddRendezVousForm({ medecinId, patientId }: Props) {
  const {
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    motif,
    setMotif,
    type,
    setType,
    handleSubmit,
    loading,
  } = useRendezVousForm(medecinId, patientId);

  return (
    <section className="flex  ">
      <form
        onSubmit={handleSubmit}
        className="bg-card  h-fit w-full  shadow-md "
      >
        <div className="">
          <div className="gap-4 flex flex-col">
            <h1 className="text-title   text-xl font-semibold">Créer un rendez-vous</h1>
            <p className="text-sm text-muted-foreground">Remplissez les détails pour planifier ce rendez-vous</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="dateDebut" className="text-sm">Date et heure de début</Label>
              <Input
                type="datetime-local"
                id="dateDebut"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFin" className="text-sm">Date et heure de fin (optionnel)</Label>
              <Input
                type="datetime-local"
                id="dateFin"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm">Type de rendez-vous</Label>
              <Select value={type} onValueChange={(v) => setType(v as TypeRendezVousEnum)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Choisissez un type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TypeRendezVousEnum).map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motif" className="text-sm">Motif</Label>
              <Textarea
                id="motif"
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
                required
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Création..." : "Créer le rendez-vous"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
