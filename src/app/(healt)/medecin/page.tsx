import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { getUserInfo } from '@/lib/users/getUserInfo'


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
  const dateNaissance = user.dateNaissance ? new Date(user.dateNaissance).toLocaleDateString() : "-";

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Profil Médecin */}
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
            <div><span className="font-semibold">Téléphone:</span> {user.telephone || '-'}</div>
            <div><span className="font-semibold">Adresse:</span> {user.adresse || '-'}</div>
            <div><span className="font-semibold">Date de naissance:</span> {dateNaissance}</div>
          </div>
        </CardContent>
      </Card>

      {/* Rendez-vous à venir (statique) */}
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle>Prochains rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            <li className="py-2 flex justify-between items-center">
              <span>08/07/2025 - 10:00</span>
              <span className="font-semibold">Precious Ogwo</span>
              <Button variant="outline" size="sm">Voir</Button>
            </li>
            <li className="py-2 flex justify-between items-center">
              <span>09/07/2025 - 14:30</span>
              <span className="font-semibold">Marie Martin</span>
              <Button variant="outline" size="sm">Voir</Button>
            </li>
            <li className="py-2 flex justify-between items-center">
              <span>10/07/2025 - 09:00</span>
              <span className="font-semibold">Ali Ben</span>
              <Button variant="outline" size="sm">Voir</Button>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Disponibilités (statique) */}
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle>Disponibilités</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Calendar className="border rounded-md" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span>Lundi</span>
                <span>09:00 - 12:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mercredi</span>
                <span>14:00 - 18:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vendredi</span>
                <span>09:00 - 12:00</span>
              </div>
              <Button className="mt-4 w-full" variant="default">Gérer mes disponibilités</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}