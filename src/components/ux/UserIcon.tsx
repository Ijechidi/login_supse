// components/UserIcon.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


type UserIconProps = {
  userId?: string;
  avatarUrl?: string;
  className?: string;
  name?: string;
};

export function UserIcon({ userId, avatarUrl, className = "", name }: UserIconProps) {
  return (
    <div className={`relative ${className}`}>
      <Avatar className="rounded-full border">
          <AvatarImage src={avatarUrl || "/default-avatar.png"} alt={name || "profile"} />
        <AvatarFallback>{name?.[0] || "U"}</AvatarFallback>
      </Avatar>

    </div>
  );
}
