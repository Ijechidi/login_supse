"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="max-w-lg mx-auto mt-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="dateDebut">Date et heure début</Label>
            <Input
              type="datetime-local"
              id="dateDebut"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="dateFin">Date et heure fin (optionnel)</Label>
            <Input
              type="datetime-local"
              id="dateFin"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="type">Type de rendez-vous</Label>
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

          <div>
            <Label htmlFor="motif">Motif</Label>
            <Textarea
              id="motif"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              required
              rows={3}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Création..." : "Créer rendez-vous"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
