import { createClient } from "@/lib/supabase/server";


export async function getUserInfo() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    email: user.email || null,
    id: user.id || null,
    name: user.user_metadata?.name || user.email?.split("@")[0],
    avatarUrl: user.user_metadata?.avatar_url || "/favicon.ico",
    role: user.user_metadata?.role || "PATIENT",
    function: user.user_metadata?.fonction || "USER",
    userPId: user.user_metadata?.prisma_user_id || null,
  };
}
