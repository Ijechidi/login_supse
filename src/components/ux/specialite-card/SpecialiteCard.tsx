import { cn } from "@/lib/utils"
import { Stethoscope } from "lucide-react"
import { Specialite } from "./types"
import { SpecialiteHeader } from "./SpecialiteHeader"
import { MedecinGrid } from "./MedecinGrid"
import { MedecinsRestantsInfo } from "./MedecinsRestantsInfo"
import { SpecialiteStats } from "./SpecialiteStats"

interface Props {
  specialite: Specialite
  className?: string
  showDescription?: boolean
  maxMedecinsVisible?: number
}

export function SpecialiteCard({
  specialite,
  className,
  showDescription = true,
  maxMedecinsVisible = 6,
}: Props) {
  const total = specialite.medecins.length
  const disponibles = specialite.medecins.filter((m) => m.isDisponible).length
  const afficher = specialite.medecins.slice(0, maxMedecinsVisible)
  const restants = Math.max(0, total - maxMedecinsVisible)

  return (
    <div className={cn(
      "w-full rounded-xl border bg-card shadow-sm hover:shadow-md overflow-hidden transition-all duration-300",
      className
    )}>
      <SpecialiteHeader specialite={specialite} showDescription={showDescription} />

      <div className="p-6">
        {total === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Aucun médecin disponible pour cette spécialité</p>
          </div>
        ) : (
          <>
            <MedecinGrid medecins={afficher} />
            <MedecinsRestantsInfo count={restants} />
            <SpecialiteStats total={total} disponibles={disponibles} nom={specialite.nom} />
          </>
        )}
      </div>
    </div>
  )
}
