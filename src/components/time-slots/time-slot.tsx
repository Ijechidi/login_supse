"use client"

import {
  Plus,
  User,
  CheckCircle,
  Hourglass,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { TimeSlot as TimeSlotType } from "@/hooks/use-calendar"
import { RendezVous } from "@/types/globalTypes"

interface TimeSlotProps {
  slot: TimeSlotType
  typesRendezVous: RendezVous[]
  onSelect: (slot: TimeSlotType) => void
  onViewDetails?: (slot: TimeSlotType) => void
}

export function TimeSlot({ slot, typesRendezVous, onSelect, onViewDetails }: TimeSlotProps) {
  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "confirme":
        return { icon: CheckCircle, className: "text-green-600 dark:text-green-400" }
      case "en_attente":
        return { icon: Hourglass, className: "text-yellow-600 dark:text-yellow-400" }
      case "annule":
        return { icon: XCircle, className: "text-red-600 dark:text-red-400" }
      case "termine":
        return { icon: AlertCircle, className: "text-muted-foreground" }
      default:
        return { icon: AlertCircle, className: "text-muted-foreground" }
    }
  }

  const getTypeConfig = (type: string) => {
    return typesRendezVous.find((t) => t.id === type)
  }

  const handleClick = () => {
    if (slot.available) {
      onSelect(slot)
    } else if (slot.rendezVous && onViewDetails) {
      onViewDetails(slot)
    }
  }

  const statusConfig = slot.rendezVous ? getStatusIcon(slot.rendezVous.statut) : null
  const StatusIcon = statusConfig?.icon
  const typeConfig = slot.rendezVous?.meta?.typeRendezVous
    ? getTypeConfig(slot.rendezVous.meta.typeRendezVous)
    : null

  const slotClasses = [
    "p-3 rounded-lg border cursor-pointer transition-all duration-200",
    slot.available
      ? "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
      : "bg-secondary border-muted text-foreground hover:bg-muted",
  ].join(" ")

  return (

      <div>
        <div  onClick={handleClick} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-medium">{slot.time}</span>
            <Badge variant={slot.available ? "outline" : "secondary"}>
              {slot.available ? "Disponible" : "Occupé"}
            </Badge>
          </div>
          {slot.available ? (
            <Plus className="h-4 w-4 text-primary" />
          ) : (
            <User className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        {slot.rendezVous && (
          <div className="space-y-2">
            <div className="text-sm font-medium">{slot.rendezVous.motif}</div>
            {slot.rendezVous.meta?.patientName && (
              <div className="text-sm text-muted-foreground">
                {slot.rendezVous.meta.patientName}
              </div>
            )}
            <div className="flex items-center gap-2">
              {/* Badge de statut avec icône et tooltip */}
              {StatusIcon && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <StatusIcon className={`h-3 w-3 ${statusConfig?.className}`} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Statut :{" "}
                        {{
                          confirme: "Confirmé",
                          en_attente: "En attente",
                          annule: "Annulé",
                          termine: "Terminé",
                        }[slot.rendezVous.statut]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {/* Badge de type avec couleur et tooltip */}
              {typeConfig && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                     
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      
               
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {slot.rendezVous.statut !== "en_attente" &&
                slot.rendezVous.dateFin && (
                  <span className="text-xs text-muted-foreground">
                    -{" "}
                    {slot.rendezVous.dateFin.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
            </div>
            <div className="text-muted-foreground text-xs italic">
              Cliquez pour voir les détails
            </div>
          </div>
        )}
      </div>

  )
}
