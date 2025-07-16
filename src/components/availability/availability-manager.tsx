"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDisponibilites } from "@/hooks/useDisponibilites";
import AddTimeSlot from './AddTimeSlot'


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

  // Filtrer les disponibilités pour le jour sélectionné
  const filteredDisponibilites = selectedDate
    ? disponibilites.filter(d => {
        const dJour = new Date(d.jour).toISOString().slice(0, 10);
        const sJour = selectedDate instanceof Date ? selectedDate.toISOString().slice(0, 10) : "";
        return dJour === sJour;
      })
    : disponibilites;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-2">Mes disponibilités</h3>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <ul className="space-y-2">
          {filteredDisponibilites.map((d) => (
            <li key={d.id} className="flex items-center gap-2">
              <span>{d.jour} {new Date(d.heureDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(d.heureFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <Button size="sm" variant="destructive" onClick={() => remove(d.id)}>Supprimer</Button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <AddTimeSlot
          onAddSlot={async (heureDebut, heureFin) => {
            if (!selectedDate) return;
            const jour = selectedDate.toISOString().slice(0, 10);
            await add({
              jour,
              heureDebut: new Date(`${jour}T${heureDebut}`),
              heureFin: new Date(`${jour}T${heureFin}`),
            });
          }}
          disabled={!selectedDate}
        />
      </div>
    </div>
  );
 
}
