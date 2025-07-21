import { Star } from "lucide-react";

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
];

export default function TestimonialsSection() {
  return (
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
  );
} 