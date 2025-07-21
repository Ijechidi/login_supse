import { cn } from "@/lib/utils"


import { Stethoscope } from "lucide-react"
import CustomAccordion from "./CustomAccordion"
import { Specialite } from "@/components/ux/specialite-card/types"
import { MedecinGrid, MedecinsRestantsInfo, SpecialiteHeader, SpecialiteStats } from "./specialite-card"

interface Props {
  specialite: Specialite
  className?: string
  showDescription?: boolean
  maxMedecinsVisible?: number
  defaultOpen?: boolean
}

export function SpecialiteAccordionCard({
  specialite,
  className,
  showDescription = true,
  maxMedecinsVisible = 6,
  defaultOpen = false,
}: Props) {
  const total = specialite.medecins.length
  const disponibles = specialite.medecins.filter((m) => m.isDisponible).length
  const afficher = specialite.medecins.slice(0, maxMedecinsVisible)
  const restants = Math.max(0, total - maxMedecinsVisible)

  return (
    <CustomAccordion
      value={specialite.nom}
      defaultValue={defaultOpen ? specialite.nom : undefined}
      className={cn(
        "w-full rounded-xl border  shadow-sm hover:shadow-md overflow-hidden transition-all duration-300  border-b ",
        className
      )}
      trigger={
        <SpecialiteHeader className="bg-gradient-to-r  from-primary/5 to-primary/10 p-6" specialite={specialite} showDescription={showDescription} />
      }
      content={
        <div className="p-6 ">
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
      }
    />
  )
}
