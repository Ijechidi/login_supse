import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
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
  );
} 