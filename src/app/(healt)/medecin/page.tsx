import { getUserInfo } from '@/lib/users/getUserInfo'

export default async function page() {

    const user  = await getUserInfo()
    if(!user){
        return <div> Vous n'êtes pas connecté </div>
    }


    
  return (
    <div>page medecin {user?.role}</div>
  )
}