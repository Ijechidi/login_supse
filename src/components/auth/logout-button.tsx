"use server"

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export async function LogoutButton() {


  const logout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();

  };

  return <Button className="w-full" onClick={logout}>Logout</Button>;
}
