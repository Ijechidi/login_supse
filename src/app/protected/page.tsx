import { getAuthUser } from "@/lib/users/getUser";

export default async function ProtectedPage() {
const user = await getAuthUser()
if (!user) {
  
}
  const role = user?.user_metadata?.role || "PATIENT";
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
    <div>page medecin {role} </div>
    </div>
  );
}


