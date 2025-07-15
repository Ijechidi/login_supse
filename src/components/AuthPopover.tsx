import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export function AuthPopover() {
  return (
    <div className="flex flex-col">
        <div className="flex flex-col md:hidden gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"> <UserPlus/> </Button>
              </PopoverTrigger>
              <PopoverContent className="w-42 flex flex-col items-center justify-center gap-2 p-2">
                <Button asChild size="sm" className="w-full" variant="outline">
                  <Link href="/auth/login">Se connecter</Link>
                </Button>
                <Button asChild size="sm" className="w-full" variant="default">
                  <Link href="/auth/sign-up">Créer un compte</Link>
                </Button>
              </PopoverContent>
            </Popover>
        </div>

        <div className="hidden md:flex  gap-2">
            <Button asChild size="sm" className="w-full" variant="outline">
          <Link href="/auth/login">Se connecter</Link>
        </Button>
        <Button asChild size="sm" className="w-full" variant="default">
          <Link href="/auth/sign-up">Créer un compte</Link>
        </Button>
        </div>
    </div>
  )
}
