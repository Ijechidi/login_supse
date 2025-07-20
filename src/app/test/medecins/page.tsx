import { getAllMedecins } from '@/lib/actions/medecins';
import React from 'react'

export default async function page() {
    const medecins = await getAllMedecins();
  return (
    <div>

{JSON.stringify(medecins, null,2)}


    </div>
  )
}
