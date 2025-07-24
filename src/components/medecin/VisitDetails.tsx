import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Stethoscope, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getRendezvousById } from "@/lib/actions/rendezvous";

interface VisitDetailsProps {
  visitId: string;
}

function PatientInfoCard({ user }: { user: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-6 h-6" />
          <span>Informations patient</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>
              {user.prenom[0]}{user.nom[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h3 className="font-medium">
              {user.prenom} {user.nom}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">{user.telephone}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Date de naissance</p>
            <p>{format(new Date(user.dateNaissance), "dd/MM/yyyy")}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Âge</p>
            <p>{new Date().getFullYear() - new Date(user.dateNaissance).getFullYear()} ans</p>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-muted-foreground">Adresse</p>
            <p>{user.adresse}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RendezVousInfoCard({ rdv }: { rdv: any }) {
  const dateDebut = format(new Date(rdv.dateDebut), "EEEE d MMMM yyyy", { locale: fr });
  const heureDebut = format(new Date(rdv.dateDebut), "HH:mm");
  const heureFin = rdv.dateFin ? format(new Date(rdv.dateFin), "HH:mm") : "N/A";
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6" />
          <span>Détails du rendez-vous</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{dateDebut}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{heureDebut} - {heureFin}</span>
          </div>
          <Badge variant={rdv.statut === "CONFIRME" ? "default" : "secondary"}>
            {rdv.statut}
          </Badge>
        </div>
        <div className="grid gap-2">
          <h3 className="font-medium flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Motif de la consultation
          </h3>
          <p className="text-sm text-muted-foreground pl-6">{rdv.motif}</p>
        </div>
        <div className="grid gap-2">
          <h3 className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Type de rendez-vous
          </h3>
          <p className="text-sm text-muted-foreground pl-6 capitalize">
            {rdv.type.toLowerCase()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function VisitDetails({ visitId }: VisitDetailsProps) {
  const rdv = await getRendezvousById(visitId);
  if (!rdv) return <div>Rendez-vous introuvable.</div>;
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <RendezVousInfoCard rdv={rdv} />
      <PatientInfoCard user={rdv.patient.user} />
    </div>
  );
}