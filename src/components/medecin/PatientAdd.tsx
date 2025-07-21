import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AvatarUserSelect, { UserInfo } from '../user/AvatarSelect'
import { getPatientsByMedecinId } from '@/lib/actions/medecins'
import { usePatientsByMedecin } from '@/hooks/usePatientsByMedecin'
import UserIcon from '../user/UserIcon'
import { UserInfoPopover } from '../user/UserInfoPopover'

interface PatientAddProps {
  medecinId: string
  onAddPatient?: (patientId: string) => void
  disponibiliteId?: string
  patientId?: string
}

export default function PatientAdd({ medecinId, onAddPatient, disponibiliteId , patientId}: PatientAddProps) {
  const { patients} = usePatientsByMedecin(medecinId)
  const [selected, setSelected] = useState<string>("")
  const patient = patients.find((p) => p.id === patientId)


  if (patient) {
   
return (
  <div>
      <UserInfoPopover user={patient} />
  </div>
)
    
  }

return(
    <div className=' '>
      <AvatarUserSelect
      disponibiliteId={disponibiliteId}
      medecinId={medecinId}
        inputPlaceholder='Rechercher un patient...'
        users={patients}
        value={selected}
        onChange={(id) => {
          setSelected(id)
          if (id) onAddPatient?.(id)
        }}
      />
    </div>

)

}
