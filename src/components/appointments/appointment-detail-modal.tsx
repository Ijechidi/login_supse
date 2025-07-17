"use client"

import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { RendezVousType, TypeRendezVous } from "@/types/rendezVous"

interface AppointmentDetailModalProps {
  appointment: RendezVousType | null
  typesRendezVous: TypeRendezVous[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (appointment: RendezVousType) => void
  onCancel?: (appointment: RendezVousType) => void
}

export function AppointmentDetailModal({
  appointment,
  typesRendezVous,
  open,
  onOpenChange,
  onEdit,
  onCancel,
}: AppointmentDetailModalProps) {
  if (!appointment) return null

  const getStatusConfig = (statut: string) => {
    switch (statut) {
      case "confirme":
        return { icon: CheckCircle, label: "Confirmé", variant: "default" as const }
      case "en_attente":
        return { icon: Hourglass, label: "En attente", variant: "secondary" as const }
      case "annule":
        return { icon: XCircle, label: "Annulé", variant: "destructive" as const }
      case "termine":
        return { icon: CheckCircle, label: "Terminé", variant: "outline" as const }
      default:
        return { icon: AlertCircle, label: statut, variant: "outline" as const }
    }
  }

  const getTypeConfig = (type: string) => {
    const typeObj = typesRendezVous.find((t) => t.id === type)
    if (!typeObj) return null
    return { nom: typeObj.nom, couleur: typeObj.couleur, description: typeObj.description }
  }

  const statusConfig = getStatusConfig(appointment.statut)
  const typeConfig = getTypeConfig(appointment.meta?.typeRendezVous || "")
  const StatusIcon = statusConfig.icon
  const showEndTime = appointment.statut !== "en_attente"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Détails du rendez-vous
          </DialogTitle>
          <DialogDescription>
            Informations complètes du rendez-vous médical
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date & heure */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-foreground">
                {appointment.dateDebut.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {appointment.dateDebut.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {showEndTime && appointment.dateFin && (
                  <span>
                    {" - "}
                    {appointment.dateFin.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Statut et type */}
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant={statusConfig.variant} className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Statut : {statusConfig.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {typeConfig && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      className="flex items-center gap-1 border-0 text-white"
                      style={{ backgroundColor: typeConfig.couleur }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white/80" />
                      {typeConfig.nom}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{typeConfig.description || typeConfig.nom}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <Separator />

          {/* Patient */}
          {appointment.meta?.patientName && (
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-foreground">{appointment.meta.patientName}</div>
                <div className="text-sm text-muted-foreground">Patient</div>
              </div>
            </div>
          )}

          {/* Téléphone */}
          {appointment.meta?.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-foreground">{appointment.meta.phone}</div>
                <div className="text-sm text-muted-foreground">Téléphone</div>
              </div>
            </div>
          )}

          {/* Motif */}
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium text-foreground">{appointment.motif}</div>
              <div className="text-sm text-muted-foreground">Motif de consultation</div>
            </div>
          </div>

          {/* Notes */}
          {appointment.meta?.notes && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium text-foreground">{appointment.meta.notes}</div>
                <div className="text-sm text-muted-foreground">Notes</div>
              </div>
            </div>
          )}

          {/* Lieu */}
          {appointment.meta?.location && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium text-foreground">{appointment.meta.location}</div>
                <div className="text-sm text-muted-foreground">Lieu</div>
              </div>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {onEdit && !["termine", "annule"].includes(appointment.statut) && (
              <Button variant="outline" onClick={() => onEdit(appointment)} className="flex-1">
                Modifier
              </Button>
            )}
            {onCancel && appointment.statut === "en_attente" && (
              <Button variant="destructive" onClick={() => onCancel(appointment)} className="flex-1">
                Annuler
              </Button>
            )}
            <Button variant="default" onClick={() => onOpenChange(false)} className="flex-1">
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
