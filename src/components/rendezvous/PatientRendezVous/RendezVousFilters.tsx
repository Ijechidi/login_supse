// RendezVousFilters.tsx
import React from "react"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Statut } from "./types"

interface RendezVousFiltersProps {
  recherche: string
  setRecherche: (recherche: string) => void
  filtreStatut: Statut | "tous"
  setFiltreStatut: (statut: Statut | "tous") => void
}

const RendezVousFilters: React.FC<RendezVousFiltersProps> = ({
  recherche,
  setRecherche,
  filtreStatut,
  setFiltreStatut,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      {/* Input avec icône de recherche */}
      <div className="relative w-full sm:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher par motif, médecin ou spécialité..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtre par statut avec icône */}
      <div className="flex items-center gap-2">
        <Filter className="text-muted-foreground w-4 h-4" />
        <Select
          value={filtreStatut}
          onValueChange={(value) => setFiltreStatut(value as Statut | "tous")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les statuts</SelectItem>
            <SelectItem value={Statut.confirme}>Confirmés</SelectItem>
            <SelectItem value={Statut.en_attente}>En attente</SelectItem>
            <SelectItem value={Statut.termine}>Terminés</SelectItem>
            <SelectItem value={Statut.annule}>Annulés</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default RendezVousFilters
