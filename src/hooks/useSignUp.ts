import { signUpUser } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export type SignUpMode = "PATIENT" | "MEDECIN";

const signUpConfig = {
  PATIENT: {
    role: "PATIENT",
    fonction: "USER",
    redirectPath: "/patient",
  },
  MEDECIN: {
    role: "MEDECIN",
    fonction: "MEDECIN",
    redirectPath: "/medecin",
  },
} as const;

export function useSignUp(mode: SignUpMode ) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ email, password, repeatPassword }: { email: string; password: string; repeatPassword: string }) => {
      const config = signUpConfig[mode];
      return await signUpUser({
        email,
        password,
        repeatPassword,
        ...config,
      });
    },
    onSuccess: (data) => {
      if (!data?.error) {
        router.push("/auth/sign-up-success");
      }
    },
  });

  const signUp = (email: string, password: string, repeatPassword: string) => {
    mutation.mutate({ email, password, repeatPassword });
  };

  return {
    signUp,
    error: mutation.error ? (mutation.error instanceof Error ? mutation.error.message : "Une erreur est survenue") : mutation.data?.error || null,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
} 