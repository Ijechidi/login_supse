import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AvatarUserSelect, { UserInfo } from '../user/AvatarSelect'
import { getPatientsByMedecinId } from '@/lib/actions/medecins'

interface VisitPatientProps {
  medecinId: string
  onAddPatient?: (patientId: string) => void
  disponibiliteId?: string
}

export default function VisitPatient({ medecinId, onAddPatient, disponibiliteId }: VisitPatientProps) {
  const [patients, setPatients] = useState<UserInfo[]>([])
  const [selected, setSelected] = useState<string>("")


  console.log(" id :", disponibiliteId ,  medecinId)

  useEffect(() => {
    async function fetchPatients() {
      const res = await getPatientsByMedecinId(medecinId)
      const users: UserInfo[] = res.map((pm: any) => ({
        id: pm.patient.id,
        name: pm.patient.user.prenom + ' ' + pm.patient.user.nom,
        email: pm.patient.user.email,
        avatar_url: pm.patient.user.avatarUrl,
        specialite: undefined,
      }))
      setPatients(users)
    }
    if (medecinId) fetchPatients()
  }, [medecinId])

  return (
    <div className='border flex items-center justify-center p-2 rounded gap-2'>

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
