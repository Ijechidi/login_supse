"use client"

import { motion } from "framer-motion"
import { Clock, Edit, Trash2, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { RendezVousType } from "@/types/rendezVous"

interface AvailabilitySlotProps {
  id: string
  heureDebut: string
  heureFin: string
  isOccupied: boolean
  isAvailable: boolean
  appointment?: RendezVousType
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onModifyAppointment?: (appointment: RendezVousType) => void
  onCancelAppointment?: (appointment: RendezVousType) => void
}

export function AvailabilitySlot({
  id,
  heureDebut,
  heureFin,
  isOccupied,
  isAvailable,
  appointment,
  onEdit,
  onDelete,
  onModifyAppointment,
  onCancelAppointment,
}: AvailabilitySlotProps) {
  const getSlotStyle = () => {
    if (!isAvailable)
      return "bg-muted/50 text-muted-foreground border border-muted"
    if (isOccupied)
      return "bg-destructive/10 text-destructive border border-destructive"
    return "bg-background text-foreground border hover:bg-muted/50"
  }

  const getStatusBadge = () => {
    if (!isAvailable) return { label: "Indisponible", variant: "secondary" as const }
    if (isOccupied) return { label: "Occupé", variant: "destructive" as const }
    return { label: "Libre", variant: "default" as const }
  }

  const statusBadge = getStatusBadge()

  return (
    <motion.div
      className={`p-4 rounded-lg transition-all duration-200 ${getSlotStyle()}`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{heureDebut} - {heureFin}</span>
        </div>
        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
      </div>

      {isOccupied && appointment && (
        <div className="mb-3 rounded-md bg-muted p-3 space-y-1">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">{appointment.meta?.patientName || "Patient"}</span>
          </div>
          <div className="text-xs text-muted-foreground">{appointment.motif}</div>
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs capitalize text-muted-foreground">
              {appointment.statut.replace("_", " ")}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {!isOccupied && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(id)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Modifier le créneau</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Supprimer le créneau</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}

        {isOccupied && appointment && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onModifyAppointment?.(appointment)}
            >
              Modifier RDV
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onCancelAppointment?.(appointment)}
            >
              Annuler RDV
            </Button>
          </>
        )}
      </div>
    </motion.div>
  )
}
