import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginWithRole } from "@/utils/auth";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await loginWithRole({ email, password });
    },
    onSuccess: (data) => {
      if (data?.redirectTo) {
        router.push(data.redirectTo);
      }
    },
  });

  const login = (email: string, password: string) => {
    mutation.mutate({ email, password });
  };

  return {
    login,
    error: mutation.error ? (mutation.error instanceof Error ? mutation.error.message : "Une erreur est survenue") : mutation.data?.error || null,
    isLoading: mutation.isPending,
  };
} 