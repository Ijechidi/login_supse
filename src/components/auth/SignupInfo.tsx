"use client"

import { useState } from "react"

const steps = [
  {
    label: "Identité",
    fields: [
      { name: "nom", placeholder: "Nom", type: "text" },
      { name: "prenom", placeholder: "Prénom", type: "text" },
    ],
  },
  {
    label: "Naissance",
    fields: [
      { name: "dateNaissance", placeholder: "Date de naissance", type: "date" },
    ],
  },
  {
    label: "Contact",
    fields: [
      { name: "telephone", placeholder: "Numéro de téléphone", type: "text" },
      { name: "adresse", placeholder: "Adresse", type: "text" },
    ],
  },
]

export default function SignupInfo({ onComplete }: { onComplete: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    telephone: "",
    adresse: "",
  })
  const [step, setStep] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete(formData)
    }
  }

  const currentStep = steps[step]

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <h2 className="text-lg font-semibold mb-2 text-center">{currentStep.label}</h2>
      <div className="grid grid-cols-1 gap-4">
        {currentStep.fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            className="input"
            required
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 rounded bg-muted text-foreground">
            Précédent
          </button>
        )}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md ml-auto">
          {step < steps.length - 1 ? "Suivant" : "Terminer"}
        </button>
      </div>
    </form>
  )
}
