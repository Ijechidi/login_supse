"use client"

import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { EnhancedDataTable } from "@/components/dashboard/enhanced-data-table"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PDFExport } from "@/components/dashboard/pdf-export"
import { medecins, rendezVous } from "@/data/medical-data"
import {
  StethoscopeIcon,
  PhoneIcon,
  ClockIcon,
  CalendarIcon,
  PlusIcon,
  MoreHorizontalIcon,
  ActivityIcon,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import type { Medecin } from "@/types/medical"

export default function MedecinsPage() {
  const totalDisponibilites = medecins.reduce((acc, m) => acc + m.disponibilites.length, 0)
  const medecinsDisponibles = medecins.filter((m) => m.disponibilites.length > 0).length
  const specialites = [...new Set(medecins.map((m) => m.specialite))]

  const getMedecinStats = (medecinId: string) => {
    const rdvMedecin = rendezVous.filter((rv) => rv.medecinId === medecinId)
    return {
      totalRdv: rdvMedecin.length,
      rdvConfirmes: rdvMedecin.filter((rv) => rv.statut === "confirme").length,
      rdvTermines: rdvMedecin.filter((rv) => rv.statut === "termine").length,
    }
  }

  const getSpecialiteColor = (specialite: string) => {
    const colors = {
      "Médecine générale": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Cardiologie: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Dermatologie: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Pédiatrie: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    }
    return colors[specialite as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const columns: ColumnDef<Medecin>[] = [
    {
      accessorKey: "user",
      header: "Médecin",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <StethoscopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium">
              Dr. {row.original.user.nom} {row.original.user.prenom}
            </div>
            <div className="text-sm text-muted-foreground">{row.original.user.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "specialite",
      header: "Spécialité",
      cell: ({ row }) => (
        <Badge variant="outline" className={getSpecialiteColor(row.getValue("specialite"))}>
          {row.getValue("specialite")}
        </Badge>
      ),
    },
    {
      accessorKey: "user.telephone",
      header: "Téléphone",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm">{row.original.user.telephone}</span>
        </div>
      ),
    },
    {
      accessorKey: "disponibilites",
      header: "Disponibilités",
      cell: ({ row }) => {
        const disponibilites = row.original.disponibilites
        return (
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{disponibilites.length} créneaux</span>
            {disponibilites.length > 0 ? (
              <Badge variant="default" className="text-xs">
                Disponible
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Indisponible
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: "rdv_stats",
      header: "RDV ce mois",
      cell: ({ row }) => {
        const stats = getMedecinStats(row.original.id)
        return (
          <div className="text-center">
            <div className="text-lg font-bold">{stats.totalRdv}</div>
            <div className="text-xs text-muted-foreground">{stats.rdvConfirmes} confirmés</div>
          </div>
        )
      },
    },
    {
      id: "performance",
      header: "Performance",
      cell: ({ row }) => {
        const stats = getMedecinStats(row.original.id)
        const tauxConfirmation = stats.totalRdv > 0 ? Math.round((stats.rdvConfirmes / stats.totalRdv) * 100) : 0

        return (
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{tauxConfirmation}%</div>
            <div className="w-16 bg-muted rounded-full h-2">
              <div className="h-2 rounded-full bg-green-500" style={{ width: `${tauxConfirmation}%` }} />
            </div>
          </div>
        )
      },
    },
    {
      id: "status",
      header: "Statut",
      cell: ({ row }) => {
        const stats = getMedecinStats(row.original.id)
        const isActive = stats.totalRdv > 5
        const hasAvailability = row.original.disponibilites.length > 0

        if (!hasAvailability) {
          return <Badge variant="destructive">Indisponible</Badge>
        }

        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Très actif" : stats.totalRdv > 0 ? "Actif" : "Peu actif"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const medecin = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>👁️ Voir le profil</DropdownMenuItem>
              <DropdownMenuItem>📅 Voir le planning</DropdownMenuItem>
              <DropdownMenuItem>✏️ Modifier</DropdownMenuItem>
              <DropdownMenuItem>⏰ Gérer disponibilités</DropdownMenuItem>
              <DropdownMenuItem>📊 Statistiques détaillées</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">🗑️ Désactiver</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filterOptions = [
    {
      key: "specialite",
      label: "Spécialité",
      options: specialites.map((spec) => ({
        label: spec,
        value: spec,
      })),
    },
    {
      key: "status",
      label: "Statut",
      options: [
        { label: "Disponible", value: "disponible" },
        { label: "Indisponible", value: "indisponible" },
        { label: "Très actif", value: "tres_actif" },
        { label: "Actif", value: "actif" },
        { label: "Peu actif", value: "peu_actif" },
      ],
    },
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
                  <h1 className="text-2xl font-bold">Équipe Médicale</h1>
                  <p className="text-muted-foreground">
                    {medecins.length} médecin(s) • {specialites.length} spécialité(s) • {totalDisponibilites} créneaux
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PDFExport type="medecins" data={medecins} showAdvancedOptions={true} />
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Nouveau médecin
                  </Button>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Médecins actifs</CardTitle>
                    <StethoscopeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{medecinsDisponibles}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((medecinsDisponibles / medecins.length) * 100)}% disponibles
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Spécialités</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{specialites.length}</div>
                    <p className="text-xs text-muted-foreground">Domaines médicaux couverts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Créneaux totaux</CardTitle>
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalDisponibilites}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((totalDisponibilites / medecins.length) * 10) / 10} par médecin
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">RDV ce mois</CardTitle>
                    <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rendezVous.length}</div>
                    <p className="text-xs text-muted-foreground">Consultations programmées</p>
                  </CardContent>
                </Card>
              </div>

              {/* Répartition par spécialité */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <StethoscopeIcon className="h-5 w-5" />
                      Répartition par Spécialité
                    </CardTitle>
                    <CardDescription>Distribution de l'équipe médicale par domaine</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {specialites.map((specialite) => {
                        const count = medecins.filter((m) => m.specialite === specialite).length
                        const medecinsSpec = medecins.filter((m) => m.specialite === specialite)
                        const rdvTotal = medecinsSpec.reduce((acc, m) => acc + getMedecinStats(m.id).totalRdv, 0)

                        return (
                          <div key={specialite} className="flex items-center space-x-4 rounded-lg border p-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <StethoscopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getSpecialiteColor(specialite)}>
                                  {specialite}
                                </Badge>
                              </div>
                              <div className="text-2xl font-bold">{count}</div>
                              <div className="text-sm text-muted-foreground">{rdvTotal} RDV ce mois</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tableau des médecins */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Liste Complète de l'Équipe Médicale</CardTitle>
                    <CardDescription>Gérez tous les médecins et leurs disponibilités</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnhancedDataTable
                      columns={columns}
                      data={medecins}
                      searchPlaceholder="Rechercher par nom, spécialité..."
                      filterOptions={filterOptions}
                      onAdd={() => console.log("Ajouter un médecin")}
                      addLabel="Nouveau médecin"
                    />
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
