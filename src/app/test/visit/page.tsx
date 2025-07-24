import { getPatientById } from '@/lib/actions/patients';
import { getRendezvousById } from '@/lib/actions/rendezvous';
import React from 'react'

export  default async function page() {
    const visiId = "04bc8759-0cec-443c-8a37-dcc273616ff4"
const patient = await getPatientById("da8b2596-9f17-49fa-9535-33e66ece3b37")
    const visits = await getRendezvousById(visiId);
  return (
    <div>
{/* 
        <pre>{JSON.stringify(visits, null, 2)}</pre> */}


<pre>
{JSON.stringify(patient, null, 2)}
</pre>
    </div>
  )
}
