import { useQuery } from '@tanstack/react-query'
import { getPatientsByMedecinId } from '@/lib/actions/medecins'
import { UserInfo } from '@/components/user/AvatarSelect'

export function usePatientsByMedecin(medecinId?: string) {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['patientsByMedecin', medecinId],
    queryFn: async () => {
      if (!medecinId) return []
      const res = await getPatientsByMedecinId(medecinId)
      const users: UserInfo[] = res.map((pm: any) => ({
        id: pm.patient.id,
        name: pm.patient.user.prenom + ' ' + pm.patient.user.nom,
        email: pm.patient.user.email,
        avatar_url: pm.patient.user.avatarUrl,
        specialite: undefined,
      }))
      return users
    },
    enabled: !!medecinId,
  })

  return {
    patients: data ?? [],
    isLoading,
    isError,
    refetch,
  }
} 