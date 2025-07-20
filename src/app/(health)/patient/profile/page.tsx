

import React from 'react'
import { getUserInfo } from '@/lib/users/getUserInfo'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function Page() {
  const user = await getUserInfo();
  if (!user) {
    return <main className="flex flex-col items-center justify-center min-h-screen bg-background">Non connecté</main>
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <ProfilePatient user={user} />
    </main>
  )
}

function ProfilePatient({ user }: { user: any }) {
  const dateNaissance = user.dateNaissance ? new Date(user.dateNaissance).toLocaleDateString() : "-"
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl || undefined} alt={user.nom || undefined} />
          <AvatarFallback>
            {user.prenom?.[0] || ''}{user.nom?.[0] || ''}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-bold">
            {user.prenom} {user.nom}
          </CardTitle>
          <div className="text-muted-foreground text-xs mt-1">
            {user.email}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div><span className="font-semibold">Téléphone:</span> {user.telephone || '-'}</div>
          <div><span className="font-semibold">Adresse:</span> {user.adresse || '-'}</div>
          <div><span className="font-semibold">Date de naissance:</span> {dateNaissance}</div>
        </div>
      </CardContent>
    </Card>
  )
}
