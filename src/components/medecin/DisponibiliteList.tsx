"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { formatHeure } from "@/lib/utils"

export interface DisponibiliteItem {
  id: string
  heureDebut: Date
  heureFin: Date
}

export interface DisponibiliteListProps {
  disponibilites: DisponibiliteItem[]
  onDelete: (id: string) => void
}

export default function DisponibiliteList({
  disponibilites,
  onDelete,
}: DisponibiliteListProps) {
  if (!disponibilites.length) {
    return (
      <div className="text-muted-foreground text-sm">
        Aucun créneau pour ce jour.
      </div>
    )
  }

  return (
    <ul className="grid gap-4">
      {disponibilites.map((d) => (
        <li key={d.id}>
          <Card className="flex items-center justify-between">
            <CardContent className="p-4 w-full flex items-center justify-between">
              <div className="text-sm font-medium text-foreground">
                {formatHeure(d.heureDebut)}
                <span className="mx-1">—</span>
                {formatHeure(d.heureFin)}
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(d.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}
