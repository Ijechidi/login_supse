


import React from "react"


import { RendezVous } from "@prisma/client"

// Types de rendez-vous disponibles
const typesRendezVous: RendezVous[] = [

]

type MedecinPageProps = {
  params: {
    medecinId: string;
  };
};

export default function MedecinPage({ params }: MedecinPageProps) {



  return (
    <main className="max-w-full w-full border mx-auto lg:px-12 p-6">
      <div>Médecin ID : {params.medecinId}</div>;

    </main>
  )
}
