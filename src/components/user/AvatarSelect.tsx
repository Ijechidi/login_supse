"use client"

import * as React from "react"
import { CheckIcon, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { UserIcon } from "../ux/UserIcon"
import MessageCard from "../ux/MessageCard"
import { TypeRendezVousEnum } from '@prisma/client'
import { useRendezVous } from '@/hooks/useRendezVous'
import { toast } from '@/hooks/use-toast'
import { createMedecinRendevous } from "@/lib/actions/rendezvous"

export type UserInfo = {
  id: string
  name: string | null
  email?: string
  avatar_url?: string | null
  specialite?: string // ← remplacé ici
}


interface AvatarUserSelectProps {
  users: UserInfo[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  inputPlaceholder?: string // ← ajouté pour personnaliser le champ de recherche
  medecinId?: string
  disponibiliteId?: string
}

export default function AvatarUserSelect({
  users,
  value,
  onChange,
  placeholder = "Sélectionner un utilisateur",
  inputPlaceholder = "Rechercher un utilisateur...",
  medecinId,
  disponibiliteId,
  
}: AvatarUserSelectProps) {
  const [open, setOpen] = React.useState(false)

  const isControlled = value !== undefined && onChange !== undefined
  const [internalValue, setInternalValue] = React.useState<string>("")
  const selectedValue = isControlled ? value : internalValue
  const setValue = (newVal: string) => {
    isControlled ? onChange?.(newVal) : setInternalValue(newVal)
  }

  const selectedUser = users.find((user) => user.id === selectedValue)

  // State pour MessageCard
  const [type, setType] = React.useState<TypeRendezVousEnum | "">("")
  const [motif, setMotif] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  // Hook pour créer un rendez-vous (nécessite medecinId dans le contexte parent)


  // Fonction de création de rendez-vous réelle
  const handleCreateRdv = async () => {

    console.log("infos : " , selectedUser , type, motif , medecinId, disponibiliteId)
    if (!selectedUser || !type || !motif || !medecinId || !disponibiliteId) {
      toast({ title: 'Erreur', description: "Informations manquantes pour créer le rendez-vous.", variant: 'destructive' })
      return
    }
    setLoading(true)
    try {
      await createMedecinRendevous({
        patientId: selectedUser.id,
        medecinId,
        disponibiliteId,
        type,
        motif,
      })
      toast({ title: 'Succès', description: 'Rendez-vous créé avec succès.' })
      setType("")
      setMotif("")
      setValue("")
      setOpen(false)
    } catch (error) {
      toast({ title: 'Erreur', description: "Erreur lors de la création du rendez-vous.", variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const usersBySpecialite = users.reduce<Record<string, UserInfo[]>>((acc, user) => {
    const specialite = user.specialite || "Autres"
    acc[specialite] = acc[specialite] || []
    acc[specialite].push(user)
    return acc
  }, {})

  if (!disponibiliteId) {
    return null
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "z-10 flex items-center justify-center rounded-full border-2 border-input bg-background hover:border-primary p-0 size-10 overflow-hidden [&>svg]:hidden"
          )}
          aria-label={selectedUser ? `Utilisateur sélectionné: ${selectedUser.name}` : placeholder}
        >
          {selectedUser ? (
            <UserIcon
              userId={selectedUser.id}
              avatarUrl={selectedUser.avatar_url || undefined}
              name={selectedUser.name || undefined}
              className="size-full"
            />
          ) : (
            <div className="text-muted-foreground text-xs"><User className="h-4 w-4" /></div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <div>
        <div className="p-2 ">
            <MessageCard
              user={selectedUser}
              type={type}
              onTypeChange={setType}
              motif={motif}
              onMotifChange={setMotif}
              onCreate={handleCreateRdv}
              loading={loading}
            />
          </div>
          <Command>
            <CommandInput placeholder={inputPlaceholder} />
            <CommandList>
              <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
              {Object.entries(usersBySpecialite).map(([specialite, users]) => (
                <CommandGroup key={specialite} heading={specialite}>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      keywords={[user.name || "", user.email || "", specialite]}
                      onSelect={() => {
                        setValue(user.id)
                        setOpen(true)
                      }}
                      className="flex gap-3 items-center px-3 py-2"
                    >
                      <UserIcon
                        userId={user.id}
                        avatarUrl={user.avatar_url || undefined}
                        name={user.name || undefined}
                        className="h-8 w-8 shrink-0"
                      />
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-medium truncate">
                          {user.name || "Utilisateur inconnu"}
                        </span>
                        {user.email && (
                          <span className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </span>
                        )}
                      </div>
                      {selectedValue === user.id && <CheckIcon size={16} className="ml-auto text-primary" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
         
        </div>
      </PopoverContent>
    </Popover>
  )
}
