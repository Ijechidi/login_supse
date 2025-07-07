import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/utils/getUser";
import { getUserInfo } from "@/lib/users/getUserInfo";



export default async function ProtectedLayout({children,}:{ children: React.ReactNode;}) {

  const userInfo = await getUserInfo()
  const supabase = await createClient();
const user = await getAuthUser();
if (!user) {
  redirect("/auth/login");
}

const role = userInfo?.role 
const fonction  = userInfo?.function 

if (role === "MEDECIN" && fonction === "ADMIN") {
  redirect("/medecin");
}
else if (role === "PATIENT") {
  redirect("/patient");
}


  return (
    <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 flex flex-col gap-20  p-2">
          {children}
        </div>

    </main>
  );
}
