import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUserInfo } from '@/lib/users/getUserInfo'
import MedecinCalendar from "@/components/medecin/MedecinCalendar";
import { getRendezVousByMedecin } from '@/lib/actions/rendezvous'
import { RendezVousList } from "@/components/medecin/RendevousList";


export default async function page() {
  const user = await getUserInfo();
  if (!user) {
    return null;
  }
  if (!user?.role || user?.role !== "MEDECIN") {
    return ('/')
  }

  // fallback for specialite
  const specialite = user.function || "Médecine Générale";
  // fallback for dateNaissance
  const dateNaissance = user.dateNaissance ? new Date(user.dateNaissance).toLocaleDateString() : " ";

  return (
    <div className="flex flex-col  gap-8 mx-auto py-10 ">
      {/* Profil Médecin */}
      <div className="flex flex-col md:flex-row  gap-8 ">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl || undefined} alt={user.nom || undefined} />
              <AvatarFallback>
                {user.prenom?.[0] || ''}{user.nom?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">
                Dr. {user.prenom} {user.nom}
              </CardTitle>
              <div className="text-muted-foreground text-sm mt-1">
                {specialite}
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {user.email}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div><span className="font-semibold">Téléphone:</span> {user.telephone || ''}</div>
              <div><span className="font-semibold">Adresse:</span> {user.adresse || '-'}</div>
              <div><span className="font-semibold">Date de naissance:</span> {dateNaissance}</div>
            </div>
          </CardContent>
        </Card>
        {/* Rendez-vous dynamiques via server action */}
        <RendezVousList medecinId={user.id} />
      </div>
      <MedecinCalendar />
    </div>
  );
}
