import Link from "next/link";

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
import { AuthPopover } from "./AuthPopover";

export async function AuthButton({name, avatarUrl,role, user}:{name?:string, avatarUrl?:string,role?:string, user:boolean}) {



  if (!user) {
    return (
      <div className="flex ">

<AuthPopover/>
      </div>
    );
  }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserIcon name={name} avatarUrl={avatarUrl} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground">
        <div className="px-3 py-1.5 gap-2 text-sm font-medium">{name}</div>
        <span> {role} </span>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* <Link href="/patient/profile/edit" scroll={false} >Mon profil</Link> */}
          <EditProfile />
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
