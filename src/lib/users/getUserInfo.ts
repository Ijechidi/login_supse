import { createClient } from "@/lib/supabase/server";
import { UserInfo } from "@/types/userInfo";

export async function getUserInfo(): Promise<UserInfo | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const meta = user.user_metadata || {};

  return {
    email: user.email || null,
    id: user.id || null,
    nom: meta.nom || user.email?.split("@")[0] || null,
    prenom: meta.prenom || null,
    name: meta.name || user.email?.split("@")[0] || null,
    avatarUrl: meta.avatar_url || "/favicon.ico",
    role: meta.role || "PATIENT",
    function: meta.fonction || "USER",
    userPId: meta.prisma_user_id || null,
    telephone: meta.telephone || null,
    dateNaissance: meta.dateNaissance || null,
    adresse: meta.adresse || null,
    sexe: meta.sexe || null,
    completedProfile: Boolean(meta.completedProfile),
    nextVisit: meta.next_visit || null,
    lastVisit: meta.last_visit || null,
  };
}
