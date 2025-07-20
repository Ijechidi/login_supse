import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getMedecinRdv } from '@/lib/actions/rendezvous'

export async function RendezVousList({ medecinId }: { medecinId: string }) {
  const rendezVous = await getMedecinRdv(medecinId)

  return (
    <Card className="max-w-2xl h-60 scroll-m-0 overflow-y-auto mx-auto shadow-md border border-muted/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Prochains rendez-vous</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rendezVous.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun rendez-vous pour le moment.</p>
        )}

        <ul className="space-y-3">
          {rendezVous.map(rdv => (
            <li
              key={rdv.id}
              className="p-4 rounded-lg border border-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-muted/10 hover:bg-muted transition"
            >
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {new Date(rdv.dateDebut).toLocaleString('fr-FR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
                <p className="font-medium">
                  {rdv.patient?.user?.prenom} {rdv.patient?.user?.nom}
                </p>
              </div>

              <div className="mt-2 sm:mt-0 flex items-center gap-3">
                <Badge variant="outline" className="capitalize text-xs">
                  {rdv.statut.toLowerCase()}
                </Badge>
                <Button variant="secondary" size="sm">
                  Voir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
