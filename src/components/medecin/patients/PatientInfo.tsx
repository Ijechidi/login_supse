

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { calculateAge } from "@/lib/utils";

interface PatientInfoProps {
  patient: any;
}

export function PatientInfo({ patient }: PatientInfoProps) {
  if (!patient) return null;
  const user = patient.user;
  const initials = `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase();
  const age = user.dateNaissance ? calculateAge(user.dateNaissance) : undefined;

  return (
    <Card className="border min-h-42 h-42 rounded-none min-w-42 flex-1">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl || null} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {user.nom} {user.prenom}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              {age && <Badge variant="secondary">{age} ans</Badge>}
              <Badge variant="outline">Patient</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Téléphone</p>
            <p>{user.telephone || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Email</p>
            <p className="truncate">{user.email}</p>
          </div>
          <div className="space-y-1 opacity-0">
            <p className="text-muted-foreground">ID Patient</p>
            <p className="truncate text-xs font-mono ">{patient.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Date de naissance</p>
            <p>{user.dateNaissance ? new Date(user.dateNaissance).toLocaleDateString() : '-'}</p>
          </div>
        </div>
        {/* Affichage des rendez-vous du patient si besoin */}
        {/* {patient.rendezVous && patient.rendezVous.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Rendez-vous :</h4>
            <ul className="list-disc pl-4">
              {patient.rendezVous.map((rdv: any) => (
                <li key={rdv.id}>
                  {rdv.motif} - {new Date(rdv.dateDebut).toLocaleString()} ({rdv.statut})
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}