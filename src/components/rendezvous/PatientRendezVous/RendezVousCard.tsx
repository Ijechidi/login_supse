import React from "react"
import { Calendar, Clock, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RendezVous, Statut } from "./types"
import { formatDate, formatHeure, getStatutColor, getStatutText } from "./utils"

interface RendezVousCardProps {
  rendezVous: RendezVous
  onViewDetails: (rendezVousId: string) => void
  onCancel: (rendezVousId: string) => void
}

const RendezVousCard: React.FC<RendezVousCardProps> = ({
  rendezVous,
  onViewDetails,
  onCancel,
}) => {
  const handleViewDetails = () => {
    onViewDetails(rendezVous.id)
  }

  const handleCancel = () => {
    onCancel(rendezVous.id)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 bg-muted/40 m-1 rounded-md ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4">
          {/* Informations principales */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: rendezVous.type.couleur || "#6b7280" }}
              />
              <span className="font-medium text-foreground">
                {rendezVous.type.nom}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatutColor(
                  rendezVous.statut
                )}`}
              >
                {getStatutText(rendezVous.statut)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(rendezVous.dateDebut)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {formatHeure(rendezVous.dateDebut)}
                  {rendezVous.dateFin && ` - ${formatHeure(rendezVous.dateFin)}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {rendezVous.medecin.user.prenom} {rendezVous.medecin.user.nom}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm">{rendezVous.medecin.specialite}</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Motif :</span>{" "}
                {rendezVous.motif}
              </p>
            </div>
          </div>

          {/* Boutons d’action */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleViewDetails}
            >
              Voir détails
            </Button>

            {rendezVous.statut === Statut.confirme && (
              <Button
                variant="destructive"
                onClick={handleCancel}
              >
                Annuler
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RendezVousCard
