interface Props {
    total: number
    disponibles: number
    nom: string
  }
  
  export function SpecialiteStats({ total, disponibles, nom }: Props) {
    return (
      <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm text-muted-foreground">
        <span>
          {disponibles} sur {total} médecin{total > 1 ? "s" : ""} disponible{disponibles > 1 ? "s" : ""}
        </span>
        <span>Spécialité: {nom}</span>
      </div>
    )
  }
  