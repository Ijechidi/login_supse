import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PDFExport, QuickPDFExport } from "@/components/dashboard/pdf-export"
import { rendezVous } from "@/data/medical-data"
import { CalendarIcon, ClockIcon, UserIcon, StethoscopeIcon, PlusIcon, FilterIcon } from "lucide-react"

export default function AppointmentsPage() {
  const stats = {
    confirme: rendezVous.filter((rv) => rv.statut === "confirme").length,
    en_attente: rendezVous.filter((rv) => rv.statut === "en_attente").length,
    termine: rendezVous.filter((rv) => rv.statut === "termine").length,
    annule: rendezVous.filter((rv) => rv.statut === "annule").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirme":
        return "bg-green-500"
      case "en_attente":
        return "bg-yellow-500"
      case "annule":
        return "bg-red-500"
      case "termine":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirme":
        return "Confirmé"
      case "en_attente":
        return "En attente"
      case "annule":
        return "Annulé"
      case "termine":
        return "Terminé"
      default:
        return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirme":
        return "default"
      case "en_attente":
        return "secondary"
      case "annule":
        return "destructive"
      case "termine":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Grouper les RDV par date
  const rdvParDate = rendezVous.reduce(
    (acc, rdv) => {
      const date = new Date(rdv.dateDebut).toDateString()
      if (!acc[date]) acc[date] = []
      acc[date].push(rdv)
      return acc
    },
    {} as Record<string, typeof rendezVous>,
  )

  const sortedDates = Object.keys(rdvParDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  return (
    <SidebarProvider>
      <MedicalSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex items-center justify-between px-4 lg:px-6">
                <div>
                  <h1 className="text-2xl font-bold">Planning des Rendez-vous</h1>
                  <p className="text-muted-foreground">
                    {rendezVous.length} rendez-vous programmé(s) • {stats.confirme} confirmé(s) • {stats.en_attente} en
                    attente
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filtrer
                  </Button>
                  <PDFExport type="appointments" data={rendezVous} showAdvancedOptions={true} />
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Nouveau RDV
                  </Button>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.confirme}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.confirme / rendezVous.length) * 100)}% du total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En attente</CardTitle>
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.en_attente}</div>
                    <p className="text-xs text-muted-foreground">À confirmer ou traiter</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Terminés</CardTitle>
                    <div className="h-3 w-3 rounded-full bg-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.termine}</div>
                    <p className="text-xs text-muted-foreground">Consultations achevées</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Annulés</CardTitle>
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.annule}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.annule / rendezVous.length) * 100)}% d'annulation
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Planning par date */}
              <div className="px-4 lg:px-6">
                <div className="space-y-6">
                  {sortedDates.map((dateString) => {
                    const rdvJour = rdvParDate[dateString]
                    const date = new Date(dateString)

                    return (
                      <div key={dateString} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            {date.toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{rdvJour.length} RDV</Badge>
                            <QuickPDFExport
                              type="appointments"
                              data={rdvJour}
                              label={`Export ${date.toLocaleDateString("fr-FR")}`}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {rdvJour
                            .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime())
                            .map((rdv) => (
                              <Card key={rdv.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <ClockIcon className="h-4 w-4" />
                                      {formatTime(rdv.dateDebut)}
                                      {rdv.dateFin && ` - ${formatTime(rdv.dateFin)}`}
                                    </CardTitle>
                                    <Badge variant={getStatusVariant(rdv.statut)}>{getStatusLabel(rdv.statut)}</Badge>
                                  </div>
                                  <CardDescription className="flex items-center gap-2">
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      style={{ backgroundColor: rdv.type.couleur }}
                                    />
                                    {rdv.type.nom}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                                      <span className="font-medium">
                                        {rdv.patient.user.nom} {rdv.patient.user.prenom}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <StethoscopeIcon className="h-4 w-4 text-muted-foreground" />
                                      <span>
                                        Dr. {rdv.medecin.user.nom} {rdv.medecin.user.prenom}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="text-sm text-muted-foreground">
                                    <strong>Motif:</strong> {rdv.motif}
                                  </div>

                                  <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                      Modifier
                                    </Button>
                                    <Button size="sm" className="flex-1">
                                      Détails
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
