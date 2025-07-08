import { CalendarIcon, StethoscopeIcon, TrendingUpIcon, UserIcon, UsersIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardStats } from "@/types/medical"

interface DashboardStatsProps {
  stats: DashboardStats
}

export function DashboardStatsCards({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Utilisateurs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalUsers}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tous les utilisateurs <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Système de gestion médicale</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Patients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalPatients}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Patients enregistrés <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Base de données patients</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Médecins</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalMedecins}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <StethoscopeIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Médecins actifs <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Équipe médicale</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Rendez-vous</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalRendezVous}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              En attente: {stats.rendezVousParStatut.en_attente}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Confirmés: {stats.rendezVousParStatut.confirme}
            </Badge>
          </div>
          <div className="text-muted-foreground">Gestion des rendez-vous</div>
        </CardFooter>
      </Card>
    </div>
  )
}
