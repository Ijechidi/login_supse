import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarUserProps {
  className?: string;
  src?: string;
  alt?: string;
  fallback?: string;
}

export default function AvatarUser({
  className,
  src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
  alt = "User Avatar",
  fallback = "UA",
}: AvatarUserProps) {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
