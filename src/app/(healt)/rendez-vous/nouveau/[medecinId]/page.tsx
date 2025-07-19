//ts-ignore


import React from "react"


import { RendezVous } from "@prisma/client"

// Types de rendez-vous disponibles
const typesRendezVous: RendezVous[] = [

]

export default function Page({ params }: { params: { medecinId: string } }) {
  return (
    <main className="max-w-full w-full border mx-auto lg:px-12 p-6">
      <div>Médecin ID : {params.medecinId}</div>
    </main>
  )
}
