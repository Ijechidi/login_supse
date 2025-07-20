import React from 'react'
import { UserIcon } from './UserIcon'
import { TypeRendezVousEnum } from '@prisma/client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Skeleton } from '../ui/skeleton'

interface MessageCardProps {
  user?: {
    id: string
    name?: string | null
    email?: string | null
    avatar_url?: string | null
  }
  type?: TypeRendezVousEnum | ""
  onTypeChange?: (type: TypeRendezVousEnum | "") => void
  motif?: string
  onMotifChange?: (motif: string) => void
  onCreate?: () => void
  loading?: boolean
}

export default function MessageCard({
  user,
  type,
  onTypeChange,
  motif,
  onMotifChange,
  onCreate,
  loading,
}: MessageCardProps) {
  if (!user) {
    return (
      <div className="bg-muted h-40 w-full p-4 z-50 rounded-xl flex flex-col gap-2">
        {/* Skeleton header */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="h-3 w-3/5 rounded" />
            <Skeleton className="h-3 w-4/5 rounded" />
          </div>
        </div>

        {/* Skeleton input fields */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-1/2 rounded" />
          <Skeleton className="h-8 w-1/2 rounded" />
        </div>

        {/* Skeleton button */}
        <Skeleton className="h-8 w-full rounded mt-auto" />
      </div>
    )
  }

  return (
    <div className="bg-muted/40 h-40 w-full p-3 z-50 rounded-xl flex flex-col gap-2">
      {/* Header utilisateur */}
      <div className="flex items-center gap-2">
        <UserIcon avatarUrl={user.avatar_url || undefined} />
        <div className="flex flex-col text-xs leading-tight overflow-hidden">
          <span className="font-semibold truncate">{user.name}</span>
          <span className="text-muted-foreground truncate">{user.email}</span>
        </div>
      </div>

      {/* Select + Input en ligne */}
      <div className="flex items-center gap-1">
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className="h-8 w-1/2 text-xs px-2">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CONSULTATION">Consultation</SelectItem>
            <SelectItem value="SUIVI">Suivi</SelectItem>
            <SelectItem value="URGENCE">Urgence</SelectItem>
            <SelectItem value="TELECONSULTATION">Téléconsultation</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="h-8 text-xs px-2 w-1/2"
          placeholder="Motif"
          value={motif}
          onChange={(e) => onMotifChange?.(e.target.value)}
        />
      </div>

      {/* Bouton */}
      <Button
        size="sm"
        className="h-8 text-xs w-full mt-auto"
        disabled={!type || !motif || loading}
        onClick={onCreate}
      >
        {loading ? "Création..." : "Créer le rendez-vous"}
      </Button>
    </div>
  )
}
