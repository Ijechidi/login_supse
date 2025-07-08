import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PDFExport, QuickPDFExport } from "@/components/dashboard/pdf-export"
import { typesRendezVous, rendezVous } from "@/data/medical-data"
import { TagIcon, PlusIcon, EditIcon, TrendingUpIcon, BarChartIcon, PaletteIcon } from "lucide-react"

export default function AppointmentTypesPage() {
  // Calculer les statistiques d'utilisation pour chaque type
  const typeStats = typesRendezVous
    .map((type) => {
      const usage = rendezVous.filter((rdv) => rdv.typeId === type.id).length
      const rdvConfirmes = rendezVous.filter((rdv) => rdv.typeId === type.id && rdv.statut === "confirme").length
      const rdvTermines = rendezVous.filter((rdv) => rdv.typeId === type.id && rdv.statut === "termine").length

      return {
        ...type,
        usage,
        rdvConfirmes,
        rdvTermines,
        tauxConfirmation: usage > 0 ? Math.round((rdvConfirmes / usage) * 100) : 0,
        tauxCompletion: usage > 0 ? Math.round((rdvTermines / usage) * 100) : 0,
      }
    })
    .sort((a, b) => b.usage - a.usage)

  const totalUsage = typeStats.reduce((acc, type) => acc + type.usage, 0)
  const typesActifs = typeStats.filter((type) => type.usage > 0).length
  const typesPlusUtilises = typeStats.slice(0, 3)

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
                  <h1 className="text-2xl font-bold">Types de Rendez-vous</h1>
                  <p className="text-muted-foreground">
                    {typesRendezVous.length} type(s) configuré(s) • {typesActifs} actif(s) • {totalUsage} utilisations
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PDFExport type="appointment-types" data={typesRendezVous} showAdvancedOptions={false} />
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Nouveau type
                  </Button>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Types configurés</CardTitle>
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{typesRendezVous.length}</div>
                    <p className="text-xs text-muted-foreground">{typesActifs} type(s) utilisé(s)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Utilisation totale</CardTitle>
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsage}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(totalUsage / typesRendezVous.length)} par type
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Plus populaire</CardTitle>
                    <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{typesPlusUtilises[0]?.usage || 0}</div>
                    <p className="text-xs text-muted-foreground">{typesPlusUtilises[0]?.nom || "Aucun"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taux moyen</CardTitle>
                    <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(typeStats.reduce((acc, type) => acc + type.tauxConfirmation, 0) / typeStats.length)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Confirmation moyenne</p>
                  </CardContent>
                </Card>
              </div>

              {/* Top 3 des types les plus utilisés */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5" />
                      Types les plus demandés
                    </CardTitle>
                    <CardDescription>Classement par nombre d'utilisations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {typesPlusUtilises.map((type, index) => (
                        <div key={type.id} className="flex items-center space-x-4 rounded-lg border p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <span className="text-lg font-bold">#{index + 1}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.couleur }} />
                              <p className="text-sm font-medium leading-none">{type.nom}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {type.usage} utilisations • {type.tauxConfirmation}% confirmés
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Liste complète des types */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Configuration complète</h3>
                  <Button variant="outline" size="sm">
                    <PaletteIcon className="mr-2 h-4 w-4" />
                    Gérer les couleurs
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {typeStats.map((type) => (
                    <Card key={type.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: type.couleur }} />
                            <CardTitle className="text-base">{type.nom}</CardTitle>
                          </div>
                          <div className="flex items-center gap-1">
                            <QuickPDFExport type="appointment-types" data={[type]} label={`Export ${type.nom}`} />
                            <Button variant="ghost" size="icon">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription>
                          <Badge variant="outline" className="text-xs">
                            {type.code}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {type.description && <p className="text-sm text-muted-foreground">{type.description}</p>}

                        {/* Statistiques d'utilisation */}
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="space-y-1">
                            <div className="text-2xl font-bold">{type.usage}</div>
                            <div className="text-xs text-muted-foreground">Utilisations</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold">{type.tauxConfirmation}%</div>
                            <div className="text-xs text-muted-foreground">Confirmés</div>
                          </div>
                        </div>

                        {/* Barre de progression */}
                        {totalUsage > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Popularité</span>
                              <span>{Math.round((type.usage / totalUsage) * 100)}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${(type.usage / totalUsage) * 100}%`,
                                  backgroundColor: type.couleur,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Métriques détaillées */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-semibold">{type.rdvConfirmes}</div>
                            <div className="text-muted-foreground">Confirmés</div>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-semibold">{type.rdvTermines}</div>
                            <div className="text-muted-foreground">Terminés</div>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-semibold">{type.tauxCompletion}%</div>
                            <div className="text-muted-foreground">Complétés</div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Modifier
                          </Button>
                          <Button size="sm" className="flex-1">
                            Statistiques
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recommandations */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>💡 Recommandations</CardTitle>
                    <CardDescription>Optimisations suggérées pour vos types de rendez-vous</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                      <div>
                        <p className="font-medium text-sm">Optimiser les créneaux populaires</p>
                        <p className="text-sm text-muted-foreground">
                          Le type "{typesPlusUtilises[0]?.nom}" représente{" "}
                          {Math.round(((typesPlusUtilises[0]?.usage || 0) / totalUsage) * 100)}% des RDV. Considérez
                          augmenter les créneaux disponibles.
                        </p>
                      </div>
                    </div>

                    {typeStats.some((type) => type.usage === 0) && (
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2" />
                        <div>
                          <p className="font-medium text-sm">Types inutilisés détectés</p>
                          <p className="text-sm text-muted-foreground">
                            {typeStats.filter((type) => type.usage === 0).length} type(s) n'ont jamais été utilisé(s).
                            Considérez les supprimer ou les promouvoir.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <p className="font-medium text-sm">Excellent taux de confirmation</p>
                        <p className="text-sm text-muted-foreground">
                          Taux moyen de confirmation de{" "}
                          {Math.round(
                            typeStats.reduce((acc, type) => acc + type.tauxConfirmation, 0) / typeStats.length,
                          )}
                          %. Continuez vos bonnes pratiques de communication.
                        </p>
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
