import { AvailabilityManager } from '@/components/availability/availability-manager'
import { getUserInfo } from '@/lib/users/getUserInfo'

export default async function page() {

    const user  = await getUserInfo()
    if(!user){
        return null
    }
if (!user?.role || user?.role === "MEDECIN") {
  <div> vous n ete pas medecin </div>
}



    
  return (
    <div>

<AvailabilityManager medecinId={user.id!} />

    </div>
  )
}