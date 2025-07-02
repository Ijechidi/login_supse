"use client"

import { useState } from "react"
import SignupInfo from "./SignupInfo"
import { updateUserMetadata, updateUserPrisma } from "@/lib/users/completeUserProfile"
import { useSession } from "@/hooks/useSession"

const steps = [
  { id: 1, title: "Authentification" },
  { id: 2, title: "Informations Supplémentaires" },
  { id: 3, title: "Terminé" },
]

export default function AuthStepper() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<{
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    telephone?: string;
    adresse?: string;
  }>({})
  const [profileCompleted, setProfileCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const session = useSession()

  const handleNext = async (data?: any) => {
    if (data) setUserData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <p className="mb-4">Formulaire ou bouton de login ici</p>
            <button onClick={() => handleNext()} className="bg-primary text-white px-4 py-2 rounded-md">
              Continuer
            </button>
          </div>
        )
      case 2:
        return <SignupInfo onComplete={handleNext} />
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Veuillez vérifier vos informations</h2>
            <div className="bg-muted p-4 rounded mb-4 max-w-md mx-auto text-left">
              <ul className="space-y-2">
                <li><span className="font-semibold">Nom :</span> {userData.nom || <span className="italic text-muted-foreground">Non renseigné</span>}</li>
                <li><span className="font-semibold">Prénom :</span> {userData.prenom || <span className="italic text-muted-foreground">Non renseigné</span>}</li>
                <li><span className="font-semibold">Date de naissance :</span> {userData.dateNaissance || <span className="italic text-muted-foreground">Non renseigné</span>}</li>
                <li><span className="font-semibold">Téléphone :</span> {userData.telephone || <span className="italic text-muted-foreground">Non renseigné</span>}</li>
                <li><span className="font-semibold">Adresse :</span> {userData.adresse || <span className="italic text-muted-foreground">Non renseigné</span>}</li>
              </ul>
            </div>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {!profileCompleted ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="flex gap-2">
                  <button
                    className="bg-muted text-foreground px-4 py-2 rounded-md"
                    onClick={() => setCurrentStep(2)}
                  >
                    Précédent
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-md"
                    onClick={async () => {
                      if (session?.user?.id) {
                        setError(null);
                        // 1. Mettre à jour Supabase user_metadata
                        const resMeta = await updateUserMetadata({
                          userId: session.user.id,
                          data: userData,
                        });
                        if (resMeta.error) {
                          setError("Erreur Supabase: " + resMeta.error);
                          return;
                        }
                        // 2. Mettre à jour Prisma
                        const resPrisma = await updateUserPrisma({
                          userId: session.user.id,
                          data: userData,
                          role: "PATIENT",
                        });
                        if (resPrisma.error) {
                          setError("Erreur Prisma: " + resPrisma.error);
                          return;
                        }
                        setProfileCompleted(true);
                      }
                    }}
                  >
                    Confirmer et enregistrer
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-green-600 font-bold mb-2">Profil complété avec succès !</div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-xl shadow-md border border-border mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">Étape {currentStep} sur {steps.length}</h1>
        <span className="text-sm text-muted-foreground">{steps[currentStep - 1].title}</span>
      </div>

      {renderStep()}
    </div>
  )
}
