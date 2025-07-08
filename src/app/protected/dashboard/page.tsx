import { MedicalSidebar } from "@/components/dashboard/medical-sidebar"
import { DashboardStatsCards } from "@/components/dashboard/dashboard-stats"
import { AppointmentsCalendar } from "@/components/dashboard/appointments-calendar"
import { PDFExport } from "@/components/dashboard/pdf-export"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { dashboardStats, rendezVous } from "@/data/medical-data"

export default function DashboardPage() {
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
                  <h1 className="text-2xl font-bold">Tableau de bord</h1>
                  <p className="text-muted-foreground">Vue d'ensemble de votre système médical</p>
                </div>
                <PDFExport />
              </div>

              <DashboardStatsCards stats={dashboardStats} />

              <div className="px-4 lg:px-6">
                <AppointmentsCalendar appointments={rendezVous} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
