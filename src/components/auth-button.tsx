import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import UserIcon from "./user/UserIcon";
import { LogoutButton } from "./logout-button";
import { EditProfile } from "./ux/EditProfile";
import { userData } from "./user/userData";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Se connecter</Link>
        </Button>
        <Button asChild size="sm" variant="default">
          <Link href="/auth/sign-up">Créer un compte</Link>
        </Button>
      </div>
    );
  }

  const name = user.user_metadata.name || undefined;
  const avatarUrl = user.user_metadata.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserIcon name={name} avatarUrl={avatarUrl} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground">
        <div className="px-3 py-1.5 gap-2 text-sm font-medium">{name}</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* <Link href="/patient/profile/edit" scroll={false} >Mon profil</Link> */}
          <EditProfile user={userData} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Paramètres</Link>
      
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
