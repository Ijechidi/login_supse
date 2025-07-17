
"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDisponibiliteForm } from "@/hooks/useDisponibiliteForm";

export function AddDisponibiliteForm({ medecinId }: { medecinId: string }) {
  const {
    heureDebut,
    setHeureDebut,
    heureFin,
    setHeureFin,
    handleSubmit,
    loading,
  } = useDisponibiliteForm(medecinId);

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardContent className="space-y-4 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="heureDebut">Heure de début</Label>
            <Input
              type="datetime-local"
              id="heureDebut"
              value={heureDebut}
              onChange={(e) => setHeureDebut(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="heureFin">Heure de fin</Label>
            <Input
              type="datetime-local"
              id="heureFin"
              value={heureFin}
              onChange={(e) => setHeureFin(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Ajout..." : "Ajouter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
