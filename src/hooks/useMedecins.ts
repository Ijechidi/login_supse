import { getAllMedecins } from '@/lib/actions/medecins'
import { useQuery } from '@tanstack/react-query'

export const useMedecins = () => {
    const {
      data: medecins = [],
      isLoading,
      isFetching,
      isError,
      error,
      refetch,
    } = useQuery({
      queryKey: ['medecins'],
      queryFn: getAllMedecins,
      staleTime: 1000 * 60 * 60, // 1 heure
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });
  
    const loading = isLoading;
  
    return {
      medecins,
      loading,
      isFetching,
      error: isError ? (error as Error)?.message : null,
      refetch,
    };
  };
