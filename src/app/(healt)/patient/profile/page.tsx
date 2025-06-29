import AfficheCard from '@/components/ux/AfficheCard'
import { EditProfile } from '@/components/ux/EditProfile'
import React from 'react'


export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      profile

      <div>
        <EditProfile/>
      </div>
      <div>
        <AfficheCard/>
      </div>
    </main>
  )
}
