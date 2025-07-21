
import React from 'react'
import { getPatientsByMedecinId } from '@/lib/actions/medecins'
import { UserIcon } from '../ux/UserIcon'

interface PatientListProps {
  medecinId: string
}

export default async function PatientList({ medecinId }: PatientListProps) {
  const data = await getPatientsByMedecinId(medecinId)
  const patients = data.map((pm: any) => {
    const user = pm.patient.user;
 
    return user
  })

  return (
    <div className="grid gap-4">
      {patients.map((patient) => (
        <div key={patient.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background shadow-sm">
          <UserIcon userId={patient.id} avatarUrl={patient.avatarUrl || undefined} name={patient.name || undefined} className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="font-medium">{patient.name}</span>
            {patient.email && <span className="text-xs text-muted-foreground">{patient.email}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
