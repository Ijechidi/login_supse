
import Link from 'next/link'
import React from 'react'


export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      profile
<Link href="/patient/profile/edit" className="underline text-blue-600">Modifier mon profil</Link>


    </main>
  )
}
