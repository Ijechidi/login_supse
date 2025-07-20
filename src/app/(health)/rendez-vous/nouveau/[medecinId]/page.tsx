//ts-ignore-all


import React from "react"


import { RendezVous } from "@prisma/client"

// Types de rendez-vous disponibles
const typesRendezVous: RendezVous[] = [

]
// @ts-ignore 
export default function MedecinPage({
  params,
}: {
  params: { medecinId: string } | Promise<{ medecinId: string }>
}) {

  return (
    <main className="max-w-full w-full border mx-auto lg:px-12 p-6">
    
    </main>
  )
}
