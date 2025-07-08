"use client"

import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { EnhancedDataTable } from "@/components/dashboard/enhanced-data-table"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PDFExport } from "@/components/dashboard/pdf-export"
import { users } from "@/data/medical-data"
import { UsersIcon, UserPlusIcon, ShieldIcon, ActivityIcon, MoreHorizontalIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import type { User } from "@/types/medical"

export default function UsersPage() {
  const roleStats = {
    ADMIN: users.filter((u) => u.role === "ADMIN").length,
    MEDECIN: users.filter((u) => u.role === "MEDECIN").length,
    PATIENT: users.filter((u) => u.role === "PATIENT").length,
    SECRETAIRE: users.filter((u) => u.role === "SECRETAIRE").length,
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive"
      case "MEDECIN":
        return "default"
      case "SECRETAIRE":
        return "secondary"
      case "PATIENT":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "👨‍💼"
      case "MEDECIN":
        return "👨‍⚕️"
      case "SECRETAIRE":
        return "📋"
      case "PATIENT":
        return "👤"
      default:
        return "👤"
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "nom",
      header: "Utilisateur",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm">{getRoleIcon(row.original.role)}</span>
          </div>
          <div>
            <div className="font-medium">
              {row.original.nom} {row.original.prenom}
            </div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Rôle",
      cell: ({ row }) => <Badge variant={getRoleBadgeVariant(row.getValue("role"))}>{row.getValue("role")}</Badge>,
    },
    {
      accessorKey: "telephone",
      header: "Téléphone",
      cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("telephone")}</span>,
    },
    {
      accessorKey: "age",
      header: "Âge",
      cell: ({ row }) => <div className="text-center">{row.getValue("age") || "N/A"}</div>,
    },
    {
      accessorKey: "adresse",
      header: "Adresse",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate" title={row.getValue("adresse")}>
          {row.getValue("adresse")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Inscrit le",
      cell: ({ row }) => (
        <div className="text-sm">{new Date(row.getValue("createdAt")).toLocaleDateString("fr-FR")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>📋 Copier l'ID</DropdownMenuItem>
              <DropdownMenuItem>👁️ Voir le profil</DropdownMenuItem>
              <DropdownMenuItem>✏️ Modifier</DropdownMenuItem>
              <DropdownMenuItem>🔄 Réinitialiser mot de passe</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">🗑️ Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filterOptions = [
    {
      key: "role",
      label: "Rôle",
      options: [
        { label: "👨‍💼 Administrateur", value: "ADMIN" },
        { label: "👨‍⚕️ Médecin", value: "MEDECIN" },
        { label: "👤 Patient", value: "PATIENT" },
        { label: "📋 Secrétaire", value: "SECRETAIRE" },
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
                  <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
                  <p className="text-muted-foreground">
                    {users.length} utilisateur(s) • {roleStats.ADMIN} admin(s) • {roleStats.MEDECIN} médecin(s) •{" "}
                    {roleStats.PATIENT} patient(s)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PDFExport type="users" data={users} showAdvancedOptions={true} />
                  <Button>
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Nouvel utilisateur
                  </Button>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
                    <ShieldIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{roleStats.ADMIN}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((roleStats.ADMIN / users.length) * 100)}% du total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Médecins</CardTitle>
                    <div className="text-lg">👨‍⚕️</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{roleStats.MEDECIN}</div>
                    <p className="text-xs text-muted-foreground">Équipe médicale</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Patients</CardTitle>
                    <UsersIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{roleStats.PATIENT}</div>
                    <p className="text-xs text-muted-foreground">Base de données patients</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Secrétaires</CardTitle>
                    <ActivityIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{roleStats.SECRETAIRE}</div>
                    <p className="text-xs text-muted-foreground">Personnel administratif</p>
                  </CardContent>
                </Card>
              </div>

              {/* Répartition par rôle */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5" />
                      Répartition des Rôles
                    </CardTitle>
                    <CardDescription>Distribution des utilisateurs par fonction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {Object.entries(roleStats).map(([role, count]) => (
                        <div key={role} className="flex items-center space-x-4 rounded-lg border p-4">
                          <div className="text-2xl">{getRoleIcon(role)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant={getRoleBadgeVariant(role)} className="text-xs">
                                {role}
                              </Badge>
                            </div>
                            <div className="text-2xl font-bold">{count}</div>
                            <div className="text-sm text-muted-foreground">
                              {Math.round((count / users.length) * 100)}% du total
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tableau des utilisateurs */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Liste Complète des Utilisateurs</CardTitle>
                    <CardDescription>Gérez tous les comptes utilisateurs du système médical</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnhancedDataTable
                      columns={columns}
                      data={users}
                      searchPlaceholder="Rechercher par nom, email..."
                      filterOptions={filterOptions}
                      onAdd={() => console.log("Ajouter un utilisateur")}
                      addLabel="Nouvel utilisateur"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Activité récente */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ActivityIcon className="h-5 w-5" />
                      Activité Récente
                    </CardTitle>
                    <CardDescription>Dernières actions des utilisateurs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.slice(0, 5).map((user, index) => (
                        <div key={user.id} className="flex items-center space-x-4 rounded-lg border p-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm">{getRoleIcon(user.role)}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user.nom} {user.prenom}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                            {user.role}
                          </Badge>
                        </div>
                      ))}
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
