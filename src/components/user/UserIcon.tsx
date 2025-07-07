import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserInfo = {
  name?: string | undefined;
  avatarUrl?: string | null;
  className?: string;
};

export default function UserIcon({ name, avatarUrl, className }: UserInfo) {
  const fallback = "U";

  return (
    <div className="relative cursor-pointer transition-all rounded-full border-2 ">
      <Avatar>
        <AvatarImage
          src={avatarUrl || "/default-avatar.png"}
          alt={name || "User"}
        />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
