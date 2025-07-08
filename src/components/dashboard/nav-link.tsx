"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import type { LucideIcon } from "lucide-react"

interface NavLinkProps {
  href: string
  title: string
  icon?: LucideIcon
  tooltip?: string
  className?: string
}

export function NavLink({ href, title, icon: Icon, tooltip, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <SidebarMenuButton
      asChild
      tooltip={tooltip || title}
      className={cn(
        "transition-colors",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
        className,
      )}
    >
      <Link href={href}>
        {Icon && <Icon />}
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  )
}
