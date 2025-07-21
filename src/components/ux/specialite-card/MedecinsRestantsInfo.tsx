interface Props {
    count: number
  }
  
  export function MedecinsRestantsInfo({ count }: Props) {
    if (count <= 0) return null
  
    return (
      <div className="mt-4 p-4 rounded-lg bg-muted/30 border-2 border-dashed border-muted-foreground/20">
        <p className="text-center text-muted-foreground">
          <span className="font-medium">+{count}</span> médecin{count > 1 ? "s" : ""} supplémentaire{count > 1 ? "s" : ""}
        </p>
        <p className="text-xs text-center text-muted-foreground/80 mt-1">
          Augmentez la limite pour voir plus de médecins
        </p>
      </div>
    )
  }
  