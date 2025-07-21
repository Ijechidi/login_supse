"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserIcon from "./UserIcon";

interface UserInfoPopoverProps {
  user: {
    avatar_url?: string | null;
    name?: string;
    email?: string;
  };
}

export function UserInfoPopover({ user }: UserInfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="p-0 rounded-full">
          <UserIcon avatarUrl={user.avatar_url || undefined} />
        </span>
      </PopoverTrigger>

      <PopoverContent
        className="w-fit overflow-hidden scrollbar-hide "
        side="top"
        align="center"
        showArrow={true}
      >
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{user.name}</span>
          <span className="text-muted-foreground">{user.email}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
