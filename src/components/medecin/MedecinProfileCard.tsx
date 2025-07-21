import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HexagonBackground } from "@/components/animate-ui/backgrounds/hexagon";
import { UserInfo } from "@/types/userInfo";

interface MedecinProfileCardProps {
  user: UserInfo;
}

export function MedecinProfileCard({ user }: MedecinProfileCardProps) {
  const specialite = user.function || "Médecine Générale";
  const dateNaissance = user.dateNaissance 
    ? new Date(user.dateNaissance).toLocaleDateString() 
    : " ";

  return (
    <Card className="md:max-w-2xl max-w-[380px] mx-auto shadow-lg relative overflow-hidden">
      {/* Conteneur pour le fond hexagone avec overflow hidden */}
      <div className="absolute inset-0 overflow-hidden">
        <HexagonBackground 
          className="h-full"
          hexagonSize={50}  // Taille réduite pour s'adapter à la carte
          hexagonMargin={1}  // Marge réduite
        />
      </div>
      
      {/* Contenu de la carte par-dessus le fond */}
      <div className="relative z-10">
  <CardHeader className="flex flex-row items-center gap-4 pb-3">
    <Avatar className="h-20 w-20 border-2 border-primary/50 shadow-md">
      <AvatarImage 
        src={user.avatarUrl || undefined} 
        alt={`Photo du Dr. ${user.nom}` || undefined}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {user.prenom?.[0] || ''}{user.nom?.[0] || ''}
      </AvatarFallback>
    </Avatar>
    <div className="space-y-1.5">
      <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Dr. {user.prenom} {user.nom}
      </CardTitle>
      <div className="flex items-center gap-2">
        <div className="text-primary/90 font-medium text-sm px-2.5 py-1 rounded-full bg-primary/10 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          {specialite}
        </div>
        <div className="text-muted-foreground/80 text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          {user.email}
        </div>
      </div>
    </div>
  </CardHeader>
  
  <CardContent className="pt-1">
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary/80">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span className="font-medium text-foreground/90">{user.telephone || 'Non renseigné'}</span>
      </div>
      
      <div className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-0.5 text-primary/80">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span className="font-medium text-foreground/90">{user.adresse || 'Adresse non renseignée'}</span>
      </div>
      
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary/80">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span className="font-medium text-foreground/90">
          {dateNaissance || 'Date non renseignée'}
        </span>
      </div>
    </div>
  </CardContent>
</div>
    </Card>
  );
}