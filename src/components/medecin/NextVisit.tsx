import { getUserInfo } from '@/lib/users/getUserInfo';
import { getNextRendezVousForMedecin } from '@/lib/actions/rendezvous';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default async function NextVisit({ medecinId }: { medecinId: string }) {
  const user = await getUserInfo();
  if (!user) return null;
  const rdv = await getNextRendezVousForMedecin(medecinId);

  if (!rdv) {
    return (
      <Card className="flex-1 overflow-y-auto scrollbar-hidden border">
        <CardHeader>
          <CardTitle>Prochain rendez-vous</CardTitle>
        </CardHeader>
        <CardContent className=' flex flex-col h-full'>
          <div className="text-muted-foreground text-center">Aucun rendez-vous à venir</div>
        </CardContent>
      </Card>
    );
  }

  const date = format(new Date(rdv.dateDebut), 'EEEE d MMMM yyyy', { locale: fr });
  const heure = format(new Date(rdv.dateDebut), 'HH:mm');
  const patient = rdv.patient?.user;

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Prochain rendez-vous</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full border-4 gap-4 items-center">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span>{heure}</span>
        </div>
        {patient && (
          <div className="flex items-center gap-3 mt-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={patient.avatarUrl} />
              <AvatarFallback>{patient.prenom[0]}{patient.nom[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{patient.prenom} {patient.nom}</span>
              <span className="text-xs text-muted-foreground">{patient.email}</span>
            </div>
          </div>
        )}
        <div className="mt-2 text-sm text-muted-foreground text-center">
          <span className="font-semibold">Motif :</span> {rdv.motif}
        </div>
        <div className="mt-1 text-xs text-muted-foreground text-center">
          <span className="font-semibold">Statut :</span> {rdv.statut}
        </div>
      </CardContent>
    </Card>
  );
}
