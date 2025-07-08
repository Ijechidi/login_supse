"use client"

import { FileDownIcon, LoaderIcon, SettingsIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  exportUsersToPDF,
  exportPatientsToPDF,
  exportMedecinsToPDF,
  exportAppointmentsToPDF,
  exportAppointmentTypesToPDF,
  exportStatisticsToPDF,
} from "@/lib/pdf-export"
import { users, patients, medecins, rendezVous, typesRendezVous, dashboardStats } from "@/data/medical-data"
import { toast } from "sonner"

interface PDFExportProps {
  type?: "all" | "users" | "patients" | "medecins" | "appointments" | "appointment-types" | "statistics"
  data?: any
  showAdvancedOptions?: boolean
}

interface ExportOptions {
  includeHistory: boolean
  includeSchedule: boolean
  groupBy: "date" | "medecin" | "patient" | "type"
  roleFilter?: string
  dateFrom?: string
  dateTo?: string
}

export function PDFExport({ type = "all", data, showAdvancedOptions = false }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includeHistory: true,
    includeSchedule: true,
    groupBy: "date",
  })

  const handleExport = async (exportType: string, options?: ExportOptions) => {
    setIsExporting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulation du temps de traitement

      switch (exportType) {
        case "users":
          const userFilters = options
            ? {
                role: options.roleFilter,
                dateFrom: options.dateFrom,
                dateTo: options.dateTo,
              }
            : undefined
          exportUsersToPDF(data || users, userFilters)
          toast.success("📋 Liste des utilisateurs exportée avec succès!")
          break
        case "patients":
          exportPatientsToPDF(data || patients, options?.includeHistory ?? true)
          toast.success("👥 Dossiers patients exportés avec succès!")
          break
        case "medecins":
          exportMedecinsToPDF(data || medecins, options?.includeSchedule ?? true)
          toast.success("🩺 Équipe médicale exportée avec succès!")
          break
        case "appointments":
          exportAppointmentsToPDF(data || rendezVous, options?.groupBy || "date")
          toast.success("📅 Planning des rendez-vous exporté avec succès!")
          break
        case "appointment-types":
          exportAppointmentTypesToPDF(data || typesRendezVous, rendezVous)
          toast.success("🏷️ Types de rendez-vous exportés avec succès!")
          break
        case "statistics":
          exportStatisticsToPDF(data || dashboardStats, users, rendezVous)
          toast.success("📊 Rapport statistiques exporté avec succès!")
          break
        default:
          toast.error("❌ Type d'export non reconnu")
      }
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error)
      toast.error("❌ Erreur lors de l'export PDF")
    } finally {
      setIsExporting(false)
      setShowOptions(false)
    }
  }

  const handleAdvancedExport = (exportType: string) => {
    if (showAdvancedOptions) {
      setShowOptions(true)
    } else {
      handleExport(exportType)
    }
  }

  // Composant de dialogue pour les options avancées
  const AdvancedOptionsDialog = ({ exportType }: { exportType: string }) => (
    <Dialog open={showOptions} onOpenChange={setShowOptions}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Options d'export avancées</DialogTitle>
          <DialogDescription>Personnalisez votre export PDF avec les options ci-dessous.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {exportType === "patients" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="include-history"
                checked={exportOptions.includeHistory}
                onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includeHistory: checked }))}
              />
              <Label htmlFor="include-history">Inclure l'historique médical détaillé</Label>
            </div>
          )}

          {exportType === "medecins" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="include-schedule"
                checked={exportOptions.includeSchedule}
                onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includeSchedule: checked }))}
              />
              <Label htmlFor="include-schedule">Inclure les plannings de disponibilité</Label>
            </div>
          )}

          {exportType === "appointments" && (
            <div className="space-y-2">
              <Label htmlFor="group-by">Grouper les rendez-vous par :</Label>
              <Select
                value={exportOptions.groupBy}
                onValueChange={(value: any) => setExportOptions((prev) => ({ ...prev, groupBy: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">📅 Date</SelectItem>
                  <SelectItem value="medecin">👨‍⚕️ Médecin</SelectItem>
                  <SelectItem value="patient">👤 Patient</SelectItem>
                  <SelectItem value="type">🏷️ Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {exportType === "users" && (
            <div className="space-y-2">
              <Label htmlFor="role-filter">Filtrer par rôle :</Label>
              <Select
                value={exportOptions.roleFilter || "all"}
                onValueChange={(value) =>
                  setExportOptions((prev) => ({ ...prev, roleFilter: value === "all" ? undefined : value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="ADMIN">👨‍💼 Administrateurs</SelectItem>
                  <SelectItem value="MEDECIN">👨‍⚕️ Médecins</SelectItem>
                  <SelectItem value="PATIENT">👤 Patients</SelectItem>
                  <SelectItem value="SECRETAIRE">📋 Secrétaires</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowOptions(false)}>
            Annuler
          </Button>
          <Button onClick={() => handleExport(exportType, exportOptions)} disabled={isExporting}>
            {isExporting ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Export...
              </>
            ) : (
              <>
                <FileDownIcon className="mr-2 h-4 w-4" />
                Exporter
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Si un type spécifique est défini, afficher un bouton simple ou avec options
  if (type !== "all") {
    return (
      <>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleAdvancedExport(type)} disabled={isExporting}>
            {isExporting ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDownIcon className="mr-2 h-4 w-4" />
            )}
            {isExporting ? "Export..." : "Exporter PDF"}
          </Button>
          {showAdvancedOptions && (
            <Button variant="ghost" size="icon" onClick={() => setShowOptions(true)}>
              <SettingsIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <AdvancedOptionsDialog exportType={type} />
      </>
    )
  }

  // Menu déroulant pour tous les types d'export
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isExporting}>
            {isExporting ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDownIcon className="mr-2 h-4 w-4" />
            )}
            {isExporting ? "Export..." : "Exporter PDF"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>📋 Gestion des utilisateurs</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAdvancedExport("users")}>👥 Liste des utilisateurs</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuLabel>🏥 Données médicales</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAdvancedExport("patients")}>👤 Dossiers patients</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAdvancedExport("medecins")}>👨‍⚕️ Équipe médicale</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuLabel>📅 Planning & Configuration</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAdvancedExport("appointments")}>📅 Planning des RDV</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAdvancedExport("appointment-types")}>
            🏷️ Types de consultations
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuLabel>📊 Rapports</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleAdvancedExport("statistics")}>
            📈 Rapport statistiques complet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AdvancedOptionsDialog exportType="users" />
    </>
  )
}

// Composant spécialisé pour l'export rapide
export function QuickPDFExport({ type, data, label }: { type: string; data?: any; label?: string }) {
  const [isExporting, setIsExporting] = useState(false)

  const handleQuickExport = async () => {
    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      switch (type) {
        case "users":
          exportUsersToPDF(data || users)
          break
        case "patients":
          exportPatientsToPDF(data || patients)
          break
        case "medecins":
          exportMedecinsToPDF(data || medecins)
          break
        case "appointments":
          exportAppointmentsToPDF(data || rendezVous)
          break
        case "statistics":
          exportStatisticsToPDF(data || dashboardStats, users, rendezVous)
          break
      }

      toast.success(`✅ ${label || "Export"} réussi!`)
    } catch (error) {
      toast.error("❌ Erreur lors de l'export")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleQuickExport} disabled={isExporting}>
      {isExporting ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <FileDownIcon className="h-4 w-4" />}
      <span className="sr-only">{label || "Export PDF"}</span>
    </Button>
  )
}
