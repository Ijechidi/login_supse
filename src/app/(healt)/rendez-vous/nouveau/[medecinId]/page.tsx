//ts-ignore


import React from "react"


import { RendezVous } from "@prisma/client"

// Types de rendez-vous disponibles
const typesRendezVous: RendezVous[] = [

]

export default function Page() {
  return (
    <main className="max-w-full w-full border mx-auto lg:px-12 p-6">
      <div>Page de prise de rendez-vous (ID médecin dans l'URL)</div>
    </main>
  )
}
