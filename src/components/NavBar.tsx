
import { Heart } from "lucide-react"
import Link from "next/link"
import { ThemeSwitcher } from "./header/theme-switcher"


import { getUserInfo } from "@/lib/users/getUserInfo"
import { NavLink } from "./NavLink"
import { AuthButton } from "./auth/auth-button"

export default async function NavBar() {

  const userInfo = await getUserInfo()

  const role = userInfo?.role || "PATIENT"
  const email = userInfo?.email || ""
  const name = userInfo?.name || "";


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo & Menu */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Heart className="h-6 w-6" />
            CareConnect
          </Link>
          <NavLink role={role} email={email} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
      
          <ThemeSwitcher />
          <AuthButton user={userInfo?.id? true : false} name={name} avatarUrl={userInfo?.avatarUrl} role={role} />
        </div>
      </div>
    </header>
  )
}
