import { User } from 'lucide-react'
import React from 'react'
import AvatarUserSelect from '../user/AvatarSelect'

export default function VisitPatient({patients}:{patients:[]}) {
  return (
    <div className='border flex items-center justify-center p-2 rounded'>

      

    <AvatarUserSelect inputPlaceholder='Rechercher un patient...' users={patients} />
    </div>
  )
}
