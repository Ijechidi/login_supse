import Link from "next/link";
import { Calendar, ArrowRight, Stethoscope, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
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
            <div className="bg-foreground rounded-3xl p-5 shadow-2xl">
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
  );
} 