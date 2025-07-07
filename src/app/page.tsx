"use client"

import Link from "next/link"
import {
  Calendar,
  Clock,
  Users,
  Shield,
  Phone,
  MapPin,
  Stethoscope,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Prise de rendez-vous facile",
      description:
        "Réservez votre consultation en quelques clics, 24h/24 et 7j/7",
    },
    {
      icon: Clock,
      title: "Gestion du temps optimisée",
      description:
        "Évitez les files d'attente et planifiez selon vos disponibilités",
    },
    {
      icon: Users,
      title: "Équipe médicale qualifiée",
      description:
        "Nos médecins spécialisés vous accompagnent avec expertise",
    },
    {
      icon: Shield,
      title: "Sécurité des données",
      description:
        "Vos informations médicales sont protégées et confidentielles",
    },
  ]

  const specialties = [
    "Médecine générale",
    "Cardiologie",
    "Dermatologie",
    "Pédiatrie",
    "Gynécologie",
    "Orthopédie",
    "Psychiatrie",
    "Ophtalmologie",
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Patiente",
      content:
        "Un service exceptionnel ! La prise de rendez-vous est très simple et les médecins sont à l'écoute.",
      rating: 5,
    },
    {
      name: "Pierre Martin",
      role: "Patient",
      content:
        "Enfin une solution moderne pour éviter les longues attentes au téléphone. Je recommande vivement !",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "Patiente",
      content:
        "Interface intuitive et équipe médicale compétente. Parfait pour toute la famille.",
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <section className="bg-muted py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Votre santé,
                  <span className="block">notre priorité</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Prenez rendez-vous avec nos médecins spécialisés en quelques
                  clics. Une solution moderne et sécurisée pour gérer vos
                  consultations médicales.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link
                    href="/protected/patient/rendez-vous"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="text-lg px-8 py-6"
                >
                  <Link href="/protected/patient/info/about">En savoir plus</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <Stat value="500+" label="Patients satisfaits" />
                <Stat value="15+" label="Médecins experts" />
                <Stat value="4.9/5" label="Note moyenne" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-foreground rounded-3xl p-8 shadow-2xl">
                <div className="bg-background rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="w-8 h-8 text-foreground" />
                    <div>
                      <h3 className="font-semibold">Consultation rapide</h3>
                      <p className="text-sm text-muted-foreground">
                        Disponible aujourd&apos;hui
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        Prochain créneau
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        Disponible
                      </span>
                    </div>
                    <div className="text-lg font-semibold">
                      Aujourd&apos;hui 14:30
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Pourquoi choisir CareConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une plateforme moderne qui simplifie la prise de rendez-vous
              médical tout en garantissant la qualité des soins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform"
              >
                <div className="bg-muted group-hover:bg-muted/80 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <feature.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Nos spécialités médicales
            </h2>
            <p className="text-xl text-muted-foreground">
              Des experts dans tous les domaines pour prendre soin de votre
              santé
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="font-medium group-hover:text-foreground transition-colors">
                    {specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ce que disent nos patients
            </h2>
            <p className="text-xl text-muted-foreground">
              La satisfaction de nos patients est notre meilleure récompense
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-muted p-8 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-background mb-6">
            Prêt à prendre soin de votre santé ?
          </h2>
          <p className="text-xl text-muted mb-8">
            Rejoignez des centaines de patients qui nous font confiance pour
            leurs soins médicaux.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-muted text-lg px-8 py-6"
          >
            <Link
              href="/protected/patient/rendez-vous"
              className="flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Commencer maintenant
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="bg-background text-foreground py-16 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Heart className="w-6 h-6" />
                CareConnect
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Votre plateforme de confiance pour la prise de rendez-vous
                médicaux en ligne.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Informations</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/protected/patient/info/about"
                    className="hover:text-foreground transition-colors"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/protected/patient/info/faq"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +228 90 00 00 00
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Avedji , Lomé-Togo
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 text-center text-sm text-muted-foreground">
            © 2025 CareConnect. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
