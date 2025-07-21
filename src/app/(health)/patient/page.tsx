import { getUserInfo } from '@/lib/users/getUserInfo'
import { getPatientRendezVous, getPatientAnciennesVisites, getPatientMedecins } from '@/lib/actions/rendezvous'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, User, Phone, MapPin, Mail } from 'lucide-react'
import React from 'react'

export default async function Page() {
  const user = await getUserInfo();
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center p-8 bg-card rounded-xl shadow-lg">
          <div className="text-muted-foreground text-lg">Non connecté</div>
        </div>
      </main>
    )
  }

  // Server actions pour charger les données principales
  const [rendezVous, anciennesVisites, medecins] = await Promise.all([
    getPatientRendezVous(user.id),
    getPatientAnciennesVisites(user.id),
    getPatientMedecins(user.id),
  ])

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mon Espace Patient</h1>
          <p className="text-muted-foreground">Gérez vos rendez-vous et consultez vos informations médicales</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile section - spans 1 column */}
          <div className="lg:col-span-1">
            <ProfilePatient user={user} />
          </div>

          {/* Main content - spans 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Mes rendez-vous à venir" icon={<Calendar className="h-5 w-5" />}>
              <RendezVousList rendezVous={rendezVous} />
            </SectionCard>
            
            <SectionCard title="Mes anciennes visites" icon={<Clock className="h-5 w-5" />}>
              <AnciennesVisitesList visites={anciennesVisites} />
            </SectionCard>
            
            <SectionCard title="Mes médecins" icon={<User className="h-5 w-5" />}>
              <MedecinsList medecins={medecins} />
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProfilePatient({ user }: { user: any }) {
  const dateNaissance = user.dateNaissance ? new Date(user.dateNaissance).toLocaleDateString() : "-"
  return (
    <Card className="w-full shadow-xl border bg-card hover:shadow-2xl transition-all duration-300 sticky top-8">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24 ring-4 ring-border shadow-lg">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.nom || undefined} />
            <AvatarFallback className="text-xl font-semibold bg-muted text-foreground">
              {user.prenom?.[0] || ''}{user.nom?.[0] || ''}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground mb-1">
          {user.prenom} {user.nom}
        </CardTitle>
        <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
          <Mail className="h-4 w-4" />
          {user.email}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <InfoRow icon={<Phone className="h-4 w-4" />} label="Téléphone" value={user.telephone || '-'} />
          <InfoRow icon={<MapPin className="h-4 w-4" />} label="Adresse" value={user.adresse || '-'} />
          <InfoRow icon={<Calendar className="h-4 w-4" />} label="Date de naissance" value={dateNaissance} />
        </div>
      </CardContent>
    </Card>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
      <div className="text-primary flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="text-foreground font-medium">{value}</div>
      </div>
    </div>
  )
}

function SectionCard({ title, children, icon }: { title: string, children: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <Card className="shadow-lg border bg-card hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
          {icon && <div className="text-primary">{icon}</div>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

function RendezVousList({ rendezVous }: { rendezVous: any[] }) {
  if (!rendezVous?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
        <p>Aucun rendez-vous à venir</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-3">
      {rendezVous.map((rdv, index) => (
        <div key={rdv.id} className={`p-4 rounded-xl border-l-4 border-primary bg-muted hover:bg-muted/70 transition-colors ${
          index === 0 ? 'ring-2 ring-primary/20' : ''
        }`}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-semibold text-foreground mb-1">
                Dr. {rdv.medecin?.user?.prenom} {rdv.medecin?.user?.nom}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(rdv.dateDebut).toLocaleString('fr-FR', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border ${
              rdv.statut === 'CONFIRME' ? 'border-green-400' :
              rdv.statut === 'EN_ATTENTE' ? 'border-yellow-400' :
              'border-muted-foreground'
            }`}>
              {rdv.statut}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AnciennesVisitesList({ visites }: { visites: any[] }) {
  if (!visites?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
        <p>Aucune visite passée</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-3">
      {visites.map(visit => (
        <div key={visit.id} className="p-4 rounded-xl  border-primary bg-muted hover:bg-muted/70 transition-colors">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-semibold text-foreground mb-1">
                Dr. {visit.medecin?.user?.prenom} {visit.medecin?.user?.nom}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(visit.dateDebut).toLocaleString('fr-FR', { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-muted-foreground`}>
              {visit.statut}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MedecinsList({ medecins }: { medecins: any[] }) {
  if (!medecins?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
        <p>Aucun médecin référent</p>
      </div>
    )
  }
  
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {medecins.map(med => (
        <div key={med.id} className="p-4 rounded-xl bg-muted hover:bg-muted/70 transition-all duration-200 border border-muted-foreground">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-border">
              <AvatarImage src={med.user?.avatarUrl || undefined} alt={med.user?.nom || undefined} />
              <AvatarFallback className="bg-muted text-foreground font-semibold">
                {med.user?.prenom?.[0] || ''}{med.user?.nom?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground truncate">
                Dr. {med.user?.prenom} {med.user?.nom}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 truncate">
                <Mail className="h-3 w-3 flex-shrink-0" />
                {med.user?.email}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}