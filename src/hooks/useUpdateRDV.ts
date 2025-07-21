// hooks/useUpdateRendezVous.ts
"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Statut, TypeRendezVousEnum } from "@prisma/client"
import { updateRendezVous } from "@/lib/actions/api"
import { queryKeys } from "./useDisponibilites"

type UpdateData = Partial<{
  type: TypeRendezVousEnum
  dateDebut: Date
  dateFin?: Date
  motif: string
  statut: Statut
  historique: any
  meta: any
}>

type Args = {
  medecinId: string
  date: string
}

export function useUpdateRendezVous({ medecinId, date }: Args) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateData }) => updateRendezVous(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.rendezVous(medecinId, date) })
      const previous = queryClient.getQueryData(queryKeys.rendezVous(medecinId, date))

      queryClient.setQueryData(queryKeys.rendezVous(medecinId, date), (old: any[] = []) =>
        old.map((item) => (item.id === id ? { ...item, ...data } : item))
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.rendezVous(medecinId, date), context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rendezVous(medecinId, date) })
    },
  })
}
