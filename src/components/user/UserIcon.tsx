import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserInfo = {
  name?: string;
  avatarUrl?: string | null;
  className?: string;
  role?: string; // "PATIENT" | "MEDECIN"
};

export default function UserIcon({ name, avatarUrl, className, role }: UserInfo) {
  const fallback = name?.charAt(0).toUpperCase() || "U";

  // Map les rôles à une classe de couleur
  const roleBorderColor = {
    PATIENT: "border-indigo-500",
    MEDECIN: "border-emerald-500",
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all rounded-full border-2",
        role && roleBorderColor[role as keyof typeof roleBorderColor],
        className
      )}
    >
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
