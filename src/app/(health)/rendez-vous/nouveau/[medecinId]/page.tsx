//ts-ignore-all


import React from "react"


import { RendezVous } from "@prisma/client"
import PatientCalendar from "@/components/patient/PatientCalendar"
import { ProfileCard } from "@/components/ux/ProfileCard"
import { getMedecinById, getNewVisitMedecinById } from "@/lib/actions/medecins"
import { MedecinCard } from "@/components/ux/MedecinCard"

// Types de rendez-vous disponibles
const typesRendezVous: RendezVous[] = [

]
// @ts-ignore 

export default async function MedecinPage({
  params,
}: {
  params: { medecinId: string };
}) {
  const medecinId = params.medecinId;

  const medecin = await getNewVisitMedecinById(medecinId);

  if (!medecin) {
    return ("/rendez-vous/nouveau")
  }

  return (
    <main className="max-w-full w-full border mx-auto lg:px-12 p-6">

      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.user.prenom} {medecin.user.nom}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous avec votre {medecin.specialite}.
        </p>

      </section>

      <div className="flex flex-col gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Informations du médecin</h2>
          <MedecinCard medecin={medecin.user} specialite={medecin.specialite} className="" />
        </section>



        <section className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">
            Disponibilités & prise de rendez-vous
          </h2>
          <PatientCalendar
          medecinId={medecin.id}
          />
        </section>
      </div>
    </main>
  )
}
