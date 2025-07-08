import { ShieldXIcon } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldXIcon className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Accès refusé</CardTitle>
          <CardDescription>
            Vous n'avez pas les permissions nécessaires pour accéder à cette page. Contactez votre administrateur si
            vous pensez qu'il s'agit d'une erreur.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
