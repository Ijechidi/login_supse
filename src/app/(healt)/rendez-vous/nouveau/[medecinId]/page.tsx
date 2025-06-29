export default async function MedecinPage({
  params,
}: {
  params: Promise<{ medecinId: string }>
}) {
  const { medecinId } = await params

  return (
    <main className="max-w-4xl mx-auto p-6">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec {medecinId}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous.
        </p>
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
