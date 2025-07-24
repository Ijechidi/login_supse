import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getMedecinRdv } from '@/lib/actions/rendezvous'
import { UserIcon } from '../ux/UserIcon'
import Link from 'next/link'

export async function RendezVousList({ medecinId }: { medecinId: string }) {
  const rendezVous = await getMedecinRdv(medecinId)

  return (
    <Card className=" md:max-w-[420px] py-8  max-w-full w-full  shadow-md border-4 border-muted/30">
      <CardContent className="space-y-4 h-80 md:h-64 rounded-md scrollbar-hidden overflow-y-auto  ">
        {rendezVous.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucun rendez-vous pour le moment.</p>
        )}

        <ul className="space-y-3">
          {rendezVous.map(rdv => (
            <li
              key={rdv.id}
              className="p-4 rounded-lg border border-muted/20 hover:border-muted flex flex-col sm:flex-row sm:items-center sm:justify-between bg-muted/10  transition"
            >
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {new Date(rdv.dateDebut).toLocaleString('fr-FR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
                <UserIcon avatarUrl={rdv.patient?.user?.avatarUrl} />
                <p className="font-medium">
                  {rdv.patient?.user?.prenom} {rdv.patient?.user?.nom}
                </p>
              </div>

              <div className="mt-2 sm:mt-0 flex items-center gap-3">
                <Badge variant="outline" className="capitalize text-xs">
                  {rdv.statut.toLowerCase()}
                </Badge>
                <Link className='bg-secondary p-1 rounded-md text-secondary-foreground shadow-sm hover:bg-secondary/80' href={`/medecin/visit/${rdv.id}`}>
                Details
                </Link>
 
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
