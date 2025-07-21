// app/test-update-rdv.tsx

"use client"

import React from "react"

import { Statut, TypeRendezVousEnum } from "@prisma/client"
import { useUpdateRendezVous } from "@/hooks/useUpdateRDV"

export default function TestUpdateRendezVous() {
  const  rdvId="04bc8759-0cec-443c-8a37-dcc273616ff4"
  const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46" // à adapter
  const date = "2025-07-21"

  const { mutate, isPending, isSuccess, isError } = useUpdateRendezVous({ medecinId, date })

  const handleUpdate = () => {
    mutate({
      id: rdvId, // remplace par un vrai id
      data: {
        type: TypeRendezVousEnum.CONSULTATION,
        statut: Statut.ANNULE,
        motif: "Test de mise à jour",
        meta: { source: "test" },
      },
    })
  }

  return (
    <div className="p-4">
      <button onClick={handleUpdate} disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded">
        {isPending ? "Mise à jour..." : "Mettre à jour le RDV"}
      </button>
      {isSuccess && <p className="text-green-600 mt-2">Mise à jour réussie !</p>}
      {isError && <p className="text-red-600 mt-2">Erreur lors de la mise à jour.</p>}
    </div>
  )
}
