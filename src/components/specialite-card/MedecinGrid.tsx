import { ProfileCard } from "../ux/ProfileCard"
import { Medecin } from "../ux/ProfileCard"

interface Props {
  medecins: Medecin[]
}

export function MedecinGrid({ medecins }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {medecins.map((medecin) => (
        <ProfileCard key={medecin.id} medecin={medecin} className="w-full" />
      ))}
    </div>
  )
}
