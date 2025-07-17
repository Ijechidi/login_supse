"use client"
import { useEffect } from 'react'
import { useDisponibilites } from '@/hooks/useDisponibilites'
import { mapDisponibilitesToSlots } from '@/lib/slots'

export default function Page() {

    const medecinId = "c2b36c2b-2b52-42fe-92f0-b55295f0fd46" // exemple de id
  const {
    fetchDisponibilites,
    disponibilites,
    loading,
  } = useDisponibilites(medecinId)

  useEffect(() => {
    fetchDisponibilites()
  }, [fetchDisponibilites])



  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Test des disponibilités</h1>
      {loading && <p>Chargement...</p>}
      {!loading && disponibilites.length === 0 && <p>Aucune disponibilité trouvée.</p>}
      {!loading && disponibilites.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(disponibilites, null, 2)}
        </pre>
      )}
    </div>
  )
}
