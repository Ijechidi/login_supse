import { Badge } from "@/components/ui/badge"
import { Stethoscope, Users } from "lucide-react"
import { Specialite } from "./types"
import { cn } from "@/lib/utils"

interface Props {
  specialite: Specialite
  showDescription?: boolean
  className?: string
}

export function SpecialiteHeader({ specialite, showDescription = true, className }: Props) {
  const total = specialite.medecins.length
  const disponibles = specialite.medecins.filter(m => m.isDisponible).length

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{specialite.nom}</h2>
            {showDescription && specialite.description && (
              <p className="text-sm text-muted-foreground mt-1 max-w-[200px] md:max-w-[350px] truncate">
                {specialite.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-2">
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            {total} médecin{total > 1 ? "s" : ""}
          </Badge>
          <Badge variant={disponibles > 0 ? "default" : "destructive"} className="gap-1">
            {disponibles} disponible{disponibles > 1 ? "s" : ""}
          </Badge>
        </div>
      </div>
    </div>
  )
}
