import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PDFExport } from "@/components/dashboard/pdf-export"
import { medecins, rendezVous, typesRendezVous, dashboardStats } from "@/data/medical-data"
import {
  BarChartIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  UsersIcon,
  StethoscopeIcon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  DownloadIcon,
} from "lucide-react"

export default function ReportsPage() {
  // Calculs avancés pour les rapports
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  // Statistiques temporelles
  const rdvCeMois = rendezVous.filter((rdv) => {
    const rdvDate = new Date(rdv.dateDebut)
    return rdvDate.getMonth() === currentMonth && rdvDate.getFullYear() === currentYear
  })

  const rdvMoisPrecedent = rendezVous.filter((rdv) => {
    const rdvDate = new Date(rdv.dateDebut)
    const moisPrecedent = currentMonth === 0 ? 11 : currentMonth - 1
    const anneePrecedente = currentMonth === 0 ? currentYear - 1 : currentYear
    return rdvDate.getMonth() === moisPrecedent && rdvDate.getFullYear() === anneePrecedente
  })

  const evolutionRdv =
    rdvMoisPrecedent.length > 0
      ? Math.round(((rdvCeMois.length - rdvMoisPrecedent.length) / rdvMoisPrecedent.length) * 100)
      : 0

  // Analyse par médecin
  const performanceMedecins = medecins
    .map((medecin) => {
      const rdvMedecin = rendezVous.filter((rdv) => rdv.medecinId === medecin.id)
      const rdvConfirmes = rdvMedecin.filter((rdv) => rdv.statut === "confirme")
      const rdvTermines = rdvMedecin.filter((rdv) => rdv.statut === "termine")

      return {
        ...medecin,
        totalRdv: rdvMedecin.length,
        rdvConfirmes: rdvConfirmes.length,
        rdvTermines: rdvTermines.length,
        tauxConfirmation: rdvMedecin.length > 0 ? Math.round((rdvConfirmes.length / rdvMedecin.length) * 100) : 0,
        tauxCompletion: rdvMedecin.length > 0 ? Math.round((rdvTermines.length / rdvMedecin.length) * 100) : 0,
      }
    })
    .sort((a, b) => b.totalRdv - a.totalRdv)

  // Analyse par type de consultation
  const analyseTypes = typesRendezVous
    .map((type) => {
      const rdvType = rendezVous.filter((rdv) => rdv.type === type.id)
      return {
        ...type,
        usage: rdvType.length,
        pourcentage: rendezVous.length > 0 ? Math.round((rdvType.length / rendezVous.length) * 100) : 0,
      }
    })
    .sort((a, b) => b.usage - a.usage)

  // Analyse des créneaux horaires
  const analyseCreneaux = rendezVous.reduce(
    (acc, rdv) => {
      const heure = new Date(rdv.dateDebut).getHours()
      const creneau = `${heure}h-${heure + 1}h`
      acc[creneau] = (acc[creneau] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const creneauxPopulaires = Object.entries(analyseCreneaux)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Indicateurs de qualité
  const tauxAnnulation = Math.round((dashboardStats.rendezVousParStatut.annule / rendezVous.length) * 100)
  const tauxConfirmation = Math.round((dashboardStats.rendezVousParStatut.confirme / rendezVous.length) * 100)
  const tauxCompletion = Math.round((dashboardStats.rendezVousParStatut.termine / rendezVous.length) * 100)

  // Alertes et recommandations
  const alertes = [
    ...(tauxAnnulation > 15
      ? [
          {
            type: "warning" as const,
            titre: "Taux d'annulation élevé",
            message: `${tauxAnnulation}% des RDV sont annulés. Considérez améliorer les rappels.`,
            action: "Configurer les rappels SMS",
          },
        ]
      : []),
    ...(performanceMedecins.some((m) => m.totalRdv === 0)
      ? [
          {
            type: "info" as const,
            titre: "Médecins inactifs",
            message: `${performanceMedecins.filter((m) => m.totalRdv === 0).length} médecin(s) sans RDV ce mois.`,
            action: "Vérifier les plannings",
          },
        ]
      : []),
    ...(analyseTypes.some((t) => t.usage === 0)
      ? [
          {
            type: "warning" as const,
            titre: "Types inutilisés",
            message: `${analyseTypes.filter((t) => t.usage === 0).length} type(s) de consultation jamais utilisé(s).`,
            action: "Réviser la configuration",
          },
        ]
      : []),
  ]

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
                  <h1 className="text-2xl font-bold">Rapports & Analyses</h1>
                  <p className="text-muted-foreground">
                    Tableau de bord analytique • Période :{" "}
                    {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PDFExport type="statistics" data={dashboardStats} showAdvancedOptions={false} />
                  <Button variant="outline">
                    <FileTextIcon className="mr-2 h-4 w-4" />
                    Rapport personnalisé
                  </Button>
                </div>
              </div>

              {/* Métriques principales */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">RDV ce mois</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rdvCeMois.length}</div>
                    <div className="flex items-center text-xs">
                      {evolutionRdv >= 0 ? (
                        <TrendingUpIcon className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDownIcon className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={evolutionRdv >= 0 ? "text-green-500" : "text-red-500"}>
                        {evolutionRdv >= 0 ? "+" : ""}
                        {evolutionRdv}%
                      </span>
                      <span className="text-muted-foreground ml-1">vs mois précédent</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux de confirmation</CardTitle>
                    <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tauxConfirmation}%</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardStats.rendezVousParStatut.confirme} RDV confirmés
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux d'annulation</CardTitle>
                    <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tauxAnnulation}%</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardStats.rendezVousParStatut.annule} RDV annulés
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux de completion</CardTitle>
                    <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tauxCompletion}%</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardStats.rendezVousParStatut.termine} RDV terminés
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Alertes et notifications */}
              {alertes.length > 0 && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangleIcon className="h-5 w-5" />
                        Alertes et Recommandations
                      </CardTitle>
                      <CardDescription>Points d'attention identifiés automatiquement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {alertes.map((alerte, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded-lg ${
                            alerte.type === "warning"
                              ? "bg-yellow-50 dark:bg-yellow-950/20"
                              : "bg-blue-50 dark:bg-blue-950/20"
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full mt-2 ${
                              alerte.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alerte.titre}</p>
                            <p className="text-sm text-muted-foreground">{alerte.message}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            {alerte.action}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Performance par médecin */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <StethoscopeIcon className="h-5 w-5" />
                      Performance par Médecin
                    </CardTitle>
                    <CardDescription>Analyse de l'activité et des résultats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceMedecins.map((medecin, index) => (
                        <div key={medecin.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              <span className="text-sm font-bold">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">
                                Dr. {medecin.user.nom} {medecin.user.prenom}
                              </p>
                              <p className="text-sm text-muted-foreground">{medecin.specialite}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <div className="font-bold">{medecin.totalRdv}</div>
                              <div className="text-muted-foreground">RDV</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold">{medecin.tauxConfirmation}%</div>
                              <div className="text-muted-foreground">Confirmés</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold">{medecin.tauxCompletion}%</div>
                              <div className="text-muted-foreground">Terminés</div>
                            </div>
                            <Badge variant={medecin.totalRdv > 10 ? "default" : "secondary"}>
                              {medecin.totalRdv > 10 ? "Très actif" : medecin.totalRdv > 5 ? "Actif" : "Peu actif"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analyse des consultations */}
              <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChartIcon className="h-5 w-5" />
                      Types de Consultation
                    </CardTitle>
                    <CardDescription>Répartition par spécialité</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analyseTypes.slice(0, 5).map((type) => (
                      <div key={type.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.couleur }} />
                          <span className="text-sm font-medium">{type.nom}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${type.pourcentage}%`,
                                backgroundColor: type.couleur,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{type.pourcentage}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5" />
                      Créneaux Populaires
                    </CardTitle>
                    <CardDescription>Heures de forte affluence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {creneauxPopulaires.map(([creneau, count], index) => (
                      <div key={creneau} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-sm font-medium">{creneau}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{
                                width: `${(count / Math.max(...Object.values(analyseCreneaux))) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Exports rapides */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DownloadIcon className="h-5 w-5" />
                      Exports Rapides
                    </CardTitle>
                    <CardDescription>Générez vos rapports en un clic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                      <Button variant="outline" className="justify-start bg-transparent">
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Rapport mensuel
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <UsersIcon className="mr-2 h-4 w-4" />
                        Liste patients
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <StethoscopeIcon className="mr-2 h-4 w-4" />
                        Performance médecins
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <BarChartIcon className="mr-2 h-4 w-4" />
                        Statistiques détaillées
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Résumé exécutif */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>📋 Résumé Exécutif</CardTitle>
                    <CardDescription>Points clés de la période</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-600">✅ Points Positifs</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Taux de confirmation élevé ({tauxConfirmation}%)</li>
                          <li>
                            • {performanceMedecins.filter((m) => m.totalRdv > 10).length} médecin(s) très actif(s)
                          </li>
                          <li>• {analyseTypes[0]?.nom} reste la consultation la plus demandée</li>
                          <li>• Bonne répartition des créneaux horaires</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-orange-600">⚠️ Points d'Amélioration</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {tauxAnnulation > 10 && <li>• Réduire le taux d'annulation ({tauxAnnulation}%)</li>}
                          {performanceMedecins.some((m) => m.totalRdv === 0) && (
                            <li>• Optimiser l'utilisation de tous les médecins</li>
                          )}
                          {analyseTypes.some((t) => t.usage === 0) && (
                            <li>• Réviser les types de consultation inutilisés</li>
                          )}
                          <li>• Améliorer la communication avec les patients</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
