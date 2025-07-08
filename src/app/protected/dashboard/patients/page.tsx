import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PDFExport, QuickPDFExport } from "@/components/dashboard/pdf-export"
import { patients } from "@/data/medical-data"
import { CalendarIcon, PhoneIcon, MailIcon, UserIcon, ActivityIcon } from "lucide-react"

export default function PatientsPage() {
  const totalRdv = patients.reduce((acc, p) => acc + p.rendezVous.length, 0)
  const patientsActifs = patients.filter((p) => p.rendezVous.length > 0).length

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
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
                  <h1 className="text-2xl font-bold">Gestion des Patients</h1>
                  <p className="text-muted-foreground">
                    {patients.length} patient(s) enregistré(s) • {patientsActifs} actif(s) • {totalRdv} RDV au total
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PDFExport type="patients" data={patients} showAdvancedOptions={true} />
                  <Button>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Nouveau patient
                  </Button>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Patients actifs</CardTitle>
                    <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patientsActifs}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((patientsActifs / patients.length) * 100)}% du total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">RDV programmés</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalRdv}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((totalRdv / patients.length) * 10) / 10} RDV par patient
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Âge moyen</CardTitle>
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(
                        patients.reduce((acc, p) => acc + calculateAge(p.user.dateNaissance), 0) / patients.length,
                      )}{" "}
                      ans
                    </div>
                    <p className="text-xs text-muted-foreground">Moyenne d'âge des patients</p>
                  </CardContent>
                </Card>
              </div>

              {/* Liste des patients */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {patients.map((patient) => (
                    <Card key={patient.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {patient.user.nom} {patient.user.prenom}
                          </CardTitle>
                          <div className="flex items-center gap-1">
                            <QuickPDFExport type="patients" data={[patient]} label="Export patient" />
                            <Badge variant={patient.rendezVous.length > 0 ? "default" : "secondary"}>
                              {patient.rendezVous.length > 0 ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>
                          {calculateAge(patient.user.dateNaissance)} ans • {patient.rendezVous.length} rendez-vous
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MailIcon className="h-4 w-4" />
                          {patient.user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <PhoneIcon className="h-4 w-4" />
                          {patient.user.telephone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          Né(e) le {new Date(patient.user.dateNaissance).toLocaleDateString("fr-FR")}
                        </div>

                        {patient.rendezVous.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Derniers rendez-vous</h4>
                            <div className="space-y-2">
                              {patient.rendezVous.slice(-3).map((rdv) => (
                                <div key={rdv.id} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${getStatusColor(rdv.statut)}`} />
                                    <span>{new Date(rdv.dateDebut).toLocaleDateString("fr-FR")}</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {getStatusLabel(rdv.statut)}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Voir dossier
                          </Button>
                          <Button size="sm" className="flex-1">
                            Nouveau RDV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
