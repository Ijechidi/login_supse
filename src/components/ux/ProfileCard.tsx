import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"

export interface Medecin {
  id: string
  nom: string
  prenom: string
  avatarUrl?: string
  specialite: string
  telephone: string
  isDisponible: boolean
}

interface ProfileCardProps {
  medecin: Medecin
  className?: string
}

export function ProfileCard({ medecin, className }: ProfileCardProps) {
  const cardContent = (
    <div
      className={cn(
        "flex flex-col text-start gap-4 p-4 rounded-lg",
        "bg-gradient-to-b from-muted dark:from-muted/50 to-muted dark:to-muted/10",
        "hover:from-muted/60 hover:to-muted/20",
        !medecin.isDisponible && "grayscale opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex justify-between items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={medecin.avatarUrl || "/default-avatar.png"}
            alt={`${medecin.prenom} ${medecin.nom}`}
          />
        </Avatar>

        <div className="relative -top-4">
          <span className="flex items-center gap-2 text-sm sm:text-md text-muted-foreground">
            {medecin.telephone}
            <FaWhatsapp className="size-6 text-green-500" />
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="text-md font-semibold leading-none">
            {medecin.prenom} {medecin.nom}
          </h3>
          <p className="text-sm text-muted-foreground">{medecin.specialite}</p>
        </div>

        <span className="mt-2 text-xs text-foreground font-medium">
          {medecin.isDisponible ? "Disponible" : "Indisponible"}
        </span>
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        "w-[320px] rounded-lg border border-t ring-4 ring-accent/50 hover:ring-accent transition-all duration-300",
        !medecin.isDisponible && "pointer-events-none",
        className
      )}
    >
      <Link href={medecin.isDisponible ? `/rendez-vous/nouveau/${medecin.id}` : "#"}>
        {cardContent}
      </Link>
    </div>
  )
}
