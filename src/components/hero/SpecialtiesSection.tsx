const specialties = [
  "Médecine générale",
  "Cardiologie",
  "Dermatologie",
  "Pédiatrie",
  "Gynécologie",
  "Orthopédie",
  "Psychiatrie",
  "Ophtalmologie",
];

export default function SpecialtiesSection() {
  return (
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
  );
} 