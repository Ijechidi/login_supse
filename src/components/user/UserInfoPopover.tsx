"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserIcon from "./UserIcon";


export function UserInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
      <span className="p-0 rounded-full" >  <UserIcon avatarUrl={"/default-avatar.png"} /></span>
      </PopoverTrigger>

      <PopoverContent className="w-fit scrollbar-hide" side="top" align="center" showArrow={true}>
        <h1 className="text-lg font-semibold">Content</h1>
      </PopoverContent>
    </Popover>
  );
}
