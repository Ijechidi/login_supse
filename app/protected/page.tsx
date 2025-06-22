import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { metadata } from '../layout';

export default async function ProtectedPage() {
  const supabase = await createClient();


  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <h1>
         <span className="font-semibold">  Welcome, {data.user.email}</span>

       <span className="font-semibold"> your role :{data.user.user_metadata?.role} </span>

        </h1>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details ( donnee de user sur le schema auth) </h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data.user, null, 2)}
        </pre>
      </div>
      <div>
        {/* j ai mis en commentaire pour ne pas gener l affcihage tu peux le decommenter */}
        {/* <FetchDataSteps /> */}
      </div>
    </div>
  );
}
