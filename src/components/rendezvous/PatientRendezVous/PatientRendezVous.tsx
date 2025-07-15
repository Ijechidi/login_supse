"use client"

import React, { useState } from "react"
import { RendezVous, Statut, PatientRendezVousProps } from "./types"
import { mockRendezVous } from "./mockData"
import RendezVousFilters from "./RendezVousFilters"
import RendezVousCard from "./RendezVousCard"
import RendezVousStatistics from "./RendezVousStatistics"
import EmptyState from "./EmptyState"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const PatientRendezVous: React.FC<PatientRendezVousProps> = ({
  patientId,
  rendezVous: rendezVousProp,
  onViewDetails,
  onCancel,
}) => {
  const [rendezVous] = useState<RendezVous[]>(rendezVousProp || mockRendezVous)
  const [filtreStatut, setFiltreStatut] = useState<Statut | "tous">("tous")
  const [recherche, setRecherche] = useState<string>("")

  // Filtrer les rendez-vous
  const rendezVousFiltres = rendezVous.filter((rdv: RendezVous) => {
    const matchStatut = filtreStatut === "tous" || rdv.statut === filtreStatut
    const matchRecherche =
      recherche === "" ||
      rdv.motif.toLowerCase().includes(recherche.toLowerCase()) ||
      rdv.medecin.user.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      rdv.medecin.user.prenom.toLowerCase().includes(recherche.toLowerCase()) ||
      rdv.medecin.specialite.toLowerCase().includes(recherche.toLowerCase())

    return matchStatut && matchRecherche
  })

  // Trier les rendez-vous par date (plus récents en premier)
  const rendezVousTries = rendezVousFiltres.sort(
    (a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime()
  )

  const handleViewDetails = (rendezVousId: string): void => {
    if (onViewDetails) {
      onViewDetails(rendezVousId)
    }
  }

  const handleCancel = (rendezVousId: string): void => {
    if (onCancel) {
      onCancel(rendezVousId)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Mes Rendez-vous</CardTitle>
          <CardDescription>
            Gérez et consultez vos rendez-vous médicaux
          </CardDescription>
        </CardHeader>
      </Card>

      <RendezVousFilters
        recherche={recherche}
        setRecherche={setRecherche}
        filtreStatut={filtreStatut}
        setFiltreStatut={setFiltreStatut}
      />

      <Separator className="my-4" />

      <div className="space-y-4">
        {rendezVousTries.length === 0 ? (
          <EmptyState />
        ) : (
          rendezVousTries.map((rdv: RendezVous) => (
            <RendezVousCard
              key={rdv.id}
              rendezVous={rdv}
              onViewDetails={handleViewDetails}
              onCancel={handleCancel}
            />
          ))
        )}
      </div>

      <div className="mt-8">
        <RendezVousStatistics rendezVous={rendezVous} />
      </div>
    </div>
  )
}

export default PatientRendezVous
