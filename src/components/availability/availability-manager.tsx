"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDisponibilites } from "@/hooks/useDisponibilites";

interface AvailabilityManagerProps {
  medecinId: string;
  selectedDate?: Date | null;
  appointments?: any[];
  onModifyAppointment?: (appointment: any) => void;
  onCancelAppointment?: (appointment: any) => void;
}

export function AvailabilityManager({
  medecinId,
  selectedDate,
}: AvailabilityManagerProps) {
  const { disponibilites, loading, fetchDisponibilites, add, remove, update } = useDisponibilites(medecinId);
  const [jour, setJour] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");

  useEffect(() => {
    fetchDisponibilites();
  }, [fetchDisponibilites]);

  const handleAdd = async () => {
    if (!jour || !heureDebut || !heureFin) return;
    await add({
      jour,
      heureDebut: new Date(`${jour}T${heureDebut}`),
      heureFin: new Date(`${jour}T${heureFin}`),
    });
    setJour("");
    setHeureDebut("");
    setHeureFin("");
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-2">Mes disponibilités</h3>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <ul className="space-y-2">
          {disponibilites.map((d) => (
            <li key={d.id} className="flex items-center gap-2">
              <span>{d.jour} {new Date(d.heureDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(d.heureFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <Button size="sm" variant="destructive" onClick={() => remove(d.id)}>Supprimer</Button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2 mt-4">
        <Input type="date" value={jour} onChange={e => setJour(e.target.value)} placeholder="Jour" />
        <Input type="time" value={heureDebut} onChange={e => setHeureDebut(e.target.value)} placeholder="Début" />
        <Input type="time" value={heureFin} onChange={e => setHeureFin(e.target.value)} placeholder="Fin" />
        <Button onClick={handleAdd} disabled={!jour || !heureDebut || !heureFin}>Ajouter</Button>
      </div>
    </div>
  );
}
