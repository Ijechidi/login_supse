'use client'

import { useId, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'

// Types
type MedecinItem = {
  value: string
  label: string
  avatarUrl?: string | null
}

type SpecialiteGroup = {
  specialite: string
  items: MedecinItem[]
}

interface MedecinSelectProps {
  medecins: {
    id: string
    specialite: string
    user: {
      nom: string
      prenom: string
      avatarUrl?: string | null
    }
  }[]
  onChange?: (medecinId: string) => void
  defaultValue?: string
  placeholder?: string
}

export default function MedecinSelect({
  medecins,
  onChange,
  defaultValue = '',
  placeholder = 'Sélectionner un médecin',
}: MedecinSelectProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  // Grouper les médecins par spécialité
  const groupedMedecins = medecins.reduce<Record<string, SpecialiteGroup>>((acc, medecin) => {
    if (!acc[medecin.specialite]) {
      acc[medecin.specialite] = {
        specialite: medecin.specialite,
        items: [],
      }
    }

    acc[medecin.specialite].items.push({
      value: medecin.id,
      label: `Dr. ${medecin.user.prenom} ${medecin.user.nom}`,
      avatarUrl: medecin.user.avatarUrl,
    })

    return acc
  }, {})

  const groups = Object.values(groupedMedecins)

  // Trouver le médecin sélectionné
  const findSelectedMedecin = () => {
    for (const group of groups) {
      const medecin = group.items.find(item => item.value === value)
      if (medecin) return medecin
    }
    return null
  }

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? '' : selectedValue
    setValue(newValue)
    onChange?.(newValue)
    setOpen(false)
  }

  const selectedMedecin = findSelectedMedecin()

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input min-w-60 w-full justify-between px-3 font-normal"
          >
            <div className="flex items-center gap-2 truncate">
              {selectedMedecin?.avatarUrl && (
                <Image
                  src={selectedMedecin.avatarUrl}
                  alt={`Photo de ${selectedMedecin.label}`}
                  width={24}
                  height={24}
                  className="rounded-full h-6 w-6"
                />
              )}
              <span className={cn('truncate', !value && 'text-muted-foreground')}>
                {selectedMedecin ? selectedMedecin.label : placeholder} 
              </span>
            </div>
            <ChevronDownIcon size={16} className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input scrollbar-hide w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="center"
        >
          <Command>
            <CommandInput placeholder="Rechercher un médecin..." />
            <CommandList>
              <CommandEmpty>Aucun médecin trouvé.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.specialite} heading={group.specialite}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      keywords={[item.label, group.specialite]}
                      onSelect={handleSelect}
                      className="flex items-center gap-2"
                    >
                      {item.avatarUrl && (
                        <Image
                          src={item.avatarUrl}
                          alt={`Photo de ${item.label}`}
                          width={24}
                          height={24}
                          className="rounded-full h-6 w-6"
                        />
                      )}
                      <span className="truncate">{item.label}</span>
                      {value === item.value && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}