import { getUserInfo } from '@/lib/users/getUserInfo'

export default async function page() {

    const user  = await getUserInfo()
    if(!user){
        return <div> Vous n'êtes pas connecté </div>
    }
if (!user?.role || user?.role === "MEDECIN") {
  <div> vous n ete pas medecin </div>
}

    
  return (
    <div>



    </div>
  )
}