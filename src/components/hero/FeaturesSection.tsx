import { Calendar, Clock, Users, Shield } from "lucide-react";

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
];

export default function FeaturesSection() {
  return (
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
  );
} 