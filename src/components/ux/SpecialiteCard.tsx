import { cn } from "@/lib/utils"
import { ProfileCard, Medecin } from "./ProfileCard"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Users } from "lucide-react"

export interface Specialite {
  nom: string
  description?: string
  medecins: Medecin[]
}

interface SpecialiteCardProps {
  specialite: Specialite
  className?: string
  showDescription?: boolean
  maxMedecinsVisible?: number
}

export function SpecialiteCard({ 
  specialite, 
  className,
  showDescription = true,
  maxMedecinsVisible = 6
}: SpecialiteCardProps) {
  const medecinsDisponibles = specialite.medecins.filter(m => m.isDisponible)
  const totalMedecins = specialite.medecins.length
  const medecinsAfficher = specialite.medecins.slice(0, maxMedecinsVisible)
  const medecinsRestants = Math.max(0, totalMedecins - maxMedecinsVisible)

  return (
    <div
      className={cn(
        "w-full rounded-xl border bg-card shadow-sm hover:shadow-md overflow-hidden transition-all duration-300",
        className
      )}
    >
      {/* En-tête de la spécialité */}
      <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {specialite.nom}
              </h2>
              {showDescription && specialite.description && (
                <p className="text-sm text-muted-foreground mt-1 max-w-[250px] md:w-full truncate">
                  {specialite.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center flex-col md:flex-row gap-2 ">
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {totalMedecins} médecin{totalMedecins > 1 ? 's' : ''}
            </Badge>
            <Badge 
              variant={medecinsDisponibles.length > 0 ? "default" : "destructive"}
              className="gap-1 "
            >
              {medecinsDisponibles.length} disponible{medecinsDisponibles.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </div>

      {/* Liste des médecins */}
      <div className="p-6">
        {totalMedecins === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Aucun médecin disponible pour cette spécialité</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medecinsAfficher.map((medecin) => (
                <ProfileCard
                  key={medecin.id}
                  medecin={medecin}
                  className="w-full"
                />
              ))}
            </div>
            
            {/* Affichage du nombre de médecins restants */}
            {medecinsRestants > 0 && (
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border-2 border-dashed border-muted-foreground/20">
                <p className="text-center text-muted-foreground">
                  <span className="font-medium">+{medecinsRestants}</span> médecin{medecinsRestants > 1 ? 's' : ''} supplémentaire{medecinsRestants > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-center text-muted-foreground/80 mt-1">
                  Augmentez la limite pour voir plus de médecins
                </p>
              </div>
            )}

            {/* Statistiques en bas */}
            <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm text-muted-foreground">
              <span>
                {medecinsDisponibles.length} sur {totalMedecins} médecin{totalMedecins > 1 ? 's' : ''} disponible{medecinsDisponibles.length > 1 ? 's' : ''}
              </span>
              <span>
                Spécialité: {specialite.nom}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}