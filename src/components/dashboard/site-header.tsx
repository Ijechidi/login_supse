"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/dashboard":
      return "Tableau de bord"
    case "/dashboard/users":
      return "Gestion des utilisateurs"
    case "/dashboard/patients":
      return "Gestion des patients"
    case "/dashboard/medecins":
      return "Équipe médicale"
    case "/dashboard/appointments":
      return "Planning des rendez-vous"
    case "/dashboard/appointment-types":
      return "Types de rendez-vous"
    case "/dashboard/reports":
      return "Rapports & Analyses"
    default:
      return "Careconnect Admin"
  }
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}
