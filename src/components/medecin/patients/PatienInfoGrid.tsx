'use client'
import React, { useState } from 'react'
import { PatientInfo } from './PatientInfo'
import CircularAvatars from './AvatarCircle'
import { usePatientsByMedecin } from '@/hooks/usePatientsByMedecin'

export default function PatienInfoGrid({medecinId}: {medecinId: string}) {
    const { patients } = usePatientsByMedecin(medecinId)
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

    // Si aucun patient sélectionné, on prend le premier de la liste
    const selectedPatientMedecin = patients.find((p: any) => p.patient.id === selectedPatientId) || patients[0];
    const selectedPatient = selectedPatientMedecin?.patient;

    const AvatarPatients = patients.map((pm: any) => ({
        id: pm.patient.id,
        src: pm.patient.user?.avatarUrl,
        fallback: `${pm.patient.user?.prenom?.[0] ?? ''}${pm.patient.user?.nom?.[0] ?? ''}`,
        tooltip: `${pm.patient.user?.prenom} ${pm.patient.user?.nom}`,
    }))

    const handleSelect = (id: string) => setSelectedPatientId(id)

    return (
        <div className='flex md:flex-row flex-col gap-8 md:gap-0 border'>
            <PatientInfo patient={selectedPatient} />
            <CircularAvatars users={AvatarPatients} onSelect={handleSelect} selectedId={selectedPatientId ?? undefined} />
        </div>
    )
}
