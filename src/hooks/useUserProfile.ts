import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@/lib/supabase/client';

export interface UserProfile {
  id: string | null;
  email: string | null;
  nom: string | null;
  prenom: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  role: string;
  fonction?: string | null;
  prisma_user_id?: string | null;
  telephone?: string | null;
  dateNaissance?: string | null;
  adresse?: string | null;
  sexe?: string | null;
  completedProfile?: boolean;
  next_visit?: string | null;
  last_visit?: string | null;
}

interface UserProfileState {
  user: UserProfile | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      fetchUser: async () => {
        set({ loading: true });
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          set({ user: null, loading: false });
          return;
        }
        const supabaseUser = data.user;
        const meta = supabaseUser.user_metadata || {};
        const user: UserProfile = {
          id: supabaseUser.id || null,
          email: supabaseUser.email || null,
          nom: meta.nom || supabaseUser.email?.split("@")[0] || null,
          prenom: meta.prenom || null,
          name: meta.name || supabaseUser.email?.split("@")[0] || null,
          avatarUrl: meta.avatar_url || "/favicon.ico",
          role: meta.role || "PATIENT",
          fonction: meta.fonction || "USER",
          prisma_user_id: meta.prisma_user_id || null,
          telephone: meta.telephone || null,
          dateNaissance: meta.dateNaissance || null,
          adresse: meta.adresse || null,
          sexe: meta.sexe || null,
          completedProfile: Boolean(meta.completedProfile),
          next_visit: meta.next_visit || null,
          last_visit: meta.last_visit || null,
        };
        set({ user, loading: false });
      },
    }),
    {
      name: 'user-profile-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export const useUserProfile = () => {
  const { user, loading, fetchUser, setUser } = useUserProfileStore();
  return { user, loading, fetchUser, setUser };
};
