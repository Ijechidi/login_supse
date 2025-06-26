"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Phone, Calendar } from "lucide-react"

interface MedecinData {
  avatarUrl: string
  nom: string
  prenom: string
  description: string
  specialiter: string
  social: string
  telephone: string
  createdAt: string
}

interface MedecinsProps {
  medecins: MedecinData[]
  className?: string
  title?: string
  description?: string
  maxDisplayed?: number
}

export function MedecinsShow({
  medecins,
  className,
  title = "Nos Médecins Spécialistes",
  description = "Découvrez notre équipe de médecins qualifiés prêts à vous accompagner dans votre parcours de santé.",
  maxDisplayed = 6,
}: MedecinsProps) {
  const [showAll, setShowAll] = useState(false)

  const openInNewTab = (url: string) => {
    window.open(url, "_blank")?.focus()
  }

  const parseSocialLinks = (socialString: string): string[] => {
    try {
      // Nettoyer la chaîne et la parser
      const cleanString = socialString.replace(/[\[\]]/g, '').trim()
      return cleanString.split(',').map(link => link.trim())
    } catch {
      return []
    }
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long'
      })
    } catch {
      return 'Date inconnue'
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <h2 className="text-center text-4xl font-medium">{title}</h2>
          <p className="text-center text-muted-foreground max-w-2xl">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "flex justify-center items-center gap-6 flex-wrap",
            !showAll &&
              medecins.length > maxDisplayed &&
              "max-h-[800px] overflow-hidden",
          )}
        >
          {medecins
            .slice(0, showAll ? undefined : maxDisplayed)
            .map((medecin, index) => (
              <Card
                key={index}
                className="w-80 h-fit p-4 flex flex-col gap-2 relative bg-card border hover:shadow-lg transition-shadow duration-300"
              >
                {/* En-tête avec photo et informations */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <Image
                      src={medecin.avatarUrl}
                      alt={`Dr ${medecin.prenom} ${medecin.nom}`}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div className="absolute border -bottom-1 -right-1 w-4 h-4 rounded-full bg-muted "></div>
                  </div>
                  <div className="flex flex-col pl-4">
                    <span className="font-semibold text-lg text-foreground">
                      Dr {medecin.prenom} {medecin.nom}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Depuis {formatDate(medecin.createdAt)}
                    </span>
                
                  </div>
                </div>

                {/* Spécialité */}
                <div className="">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    <span>{medecin.specialiter}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-foreground text-sm leading-relaxed">
                    {medecin.description}
                  </p>
                </div>

                {/* Contact */}
             
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{medecin.telephone}</span>
                  </div>
        

                {/* Liens sociaux */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {parseSocialLinks(medecin.social).map((link, linkIndex) => (
                    <button
                      key={linkIndex}
                      onClick={() => openInNewTab(link)}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Icons.twitter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </Card>
            ))}
        </div>

        {medecins.length > maxDisplayed && !showAll && (
          <>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
              <Button 
                variant="secondary" 
                onClick={() => setShowAll(true)}
                className="shadow-lg"
              >
                Voir tous les médecins
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}