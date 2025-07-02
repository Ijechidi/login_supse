import { getMedecinById } from "@/lib/utils/getMedecinById"
import { ProfileCard } from "@/components/ux/ProfileCard"
import { notFound } from "next/navigation"

export default async function MedecinPage({
  params,
}: {
  params: Promise<{ medecinId: string }>
}) {
  const { medecinId } = await params
  const medecin = getMedecinById(medecinId)

  if (!medecin) {
    notFound()
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.prenom} {medecin.nom}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous avec votre {medecin.specialite}.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Informations du médecin</h2>
        <ProfileCard medecin={medecin} className="w-full max-w-md mx-auto" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Disponibilités & prise de rendez-vous
        </h2>
        {/* <Calendar medecinId={medecinId} /> */}
      </section>
    </main>
  )
}
