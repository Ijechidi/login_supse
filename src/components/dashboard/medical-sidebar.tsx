"use client"

import type * as React from "react"
import Link from "next/link"
import {
  ActivityIcon,
  CalendarIcon,
  FileTextIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  StethoscopeIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"

export function MedicalSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { currentUser, canAccess } = useAuth()

  /* Définition de la navigation avec contrôle d'accès par rôle */
  const navItems = [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      roles: ["ADMIN", "MEDECIN", "SECRETAIRE"],
    },
    {
      title: "Utilisateurs",
      url: "/dashboard/users",
      icon: UsersIcon,
      roles: ["ADMIN"],
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: UserIcon,
      roles: ["ADMIN", "SECRETAIRE"],
    },
    {
      title: "Médecins",
      url: "/dashboard/medecins",
      icon: StethoscopeIcon,
      roles: ["ADMIN"],
    },
    {
      title: "Rendez-vous",
      url: "/dashboard/appointments",
      icon: CalendarIcon,
      roles: ["ADMIN", "MEDECIN", "SECRETAIRE"],
    },
    {
      title: "Types RDV",
      url: "/dashboard/appointment-types",
      icon: ActivityIcon,
      roles: ["ADMIN"],
    },
    {
      title: "Rapports",
      url: "/dashboard/reports",
      icon: FileTextIcon,
      roles: ["ADMIN"],
    },
  ]
    .map((item) => ({
      ...item,
      url: `/protected${item.url}`, // préfixer chaque url
    }))
    .filter((item) => canAccess(item.roles as any))

  const user = {
    name: `${currentUser.prenom} ${currentUser.nom}`,
    email: "admin@medical.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Logo + titre */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/protected/dashboard">
                <HeartHandshakeIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Careconnect Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation principale */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* Utilisateur connecté */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
