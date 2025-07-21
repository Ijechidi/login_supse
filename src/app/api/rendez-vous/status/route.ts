import { updateRendezVousStatus } from '@/lib/actions/rendezvous'
import { NextRequest } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { id, statut } = await req.json()
    if (!id || !statut) {
      return new Response('Champs manquants', { status: 400 })
    }
    const rdv = await updateRendezVousStatus({ id, statut })
    return Response.json({ success: true, rendezVous: rdv })
  } catch (e) {
    return new Response('Erreur serveur', { status: 500 })
  }
} 