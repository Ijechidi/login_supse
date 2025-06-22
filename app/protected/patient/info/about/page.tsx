import Link from "next/link";
import { 
  Heart, 
  Users, 
  Award, 
  Target, 
  Shield, 
  Clock,
  Phone,
  MapPin,
  Mail,
  Star,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Calendar,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Nous plaçons l'humain au centre de nos préoccupations avec empathie et bienveillance."
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Protection absolue de vos données personnelles et médicales selon les normes les plus strictes."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque service offert pour votre satisfaction optimale."
    },
    {
      icon: Users,
      title: "Accessibilité",
      description: "Des soins de qualité accessibles à tous, où que vous soyez et quand vous en avez besoin."
    }
  ];

  const stats = [
    { number: "2000+", label: "Patients satisfaits", icon: Users },
    { number: "25+", label: "Médecins experts", icon: Stethoscope },
    { number: "50+", label: "Spécialités couvertes", icon: Award },
    { number: "24/7", label: "Support disponible", icon: Clock }
  ];

  const team = [
    {
      name: "Dr. Amla Adoum",
      role: "Directrice Médicale",
      specialty: "Médecine Générale",
      experience: "15 ans d'expérience",
      description: "Spécialisée dans les soins primaires et la médecine préventive."
    },
    {
      name: "Dr. Koffi AGbessi",
      role: "Cardiologue",
      specialty: "Cardiologie",
      experience: "12 ans d'expérience",
      description: "Expert en cardiologie interventionnelle et prévention cardiovasculaire."
    },
    {
      name: "Dr. Laeticia Mensah",
      role: "Pédiatre",
      specialty: "Pédiatrie",
      experience: "10 ans d'expérience",
      description: "Passionnée par les soins aux enfants et la médecine familiale."
    },
    {
      name: "Dr. James Lawson",
      role: "Dermatologue",
      specialty: "Dermatologie",
      experience: "8 ans d'expérience",
      description: "Spécialiste en dermatologie esthétique et médicale."
    }
  ];

  
  

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  À propos de
                  <span className="text-black block">CareConnect</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Depuis 2020, nous révolutionnons l'accès aux soins de santé en connectant 
                  patients et médecins à travers une plateforme innovante et sécurisée.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-lg px-8 py-6"
                >
                  <Link href="/protected/patient/rendez-vous" className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Rejoignez-nous
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Espace pour photo d'équipe */}
            <div className="relative animate-fade-in-right">
              <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Photo d'équipe</p>
                    <p className="text-sm">à insérer ici</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Heart className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-white/10 group-hover:bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900">
                Notre Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rendre les soins de santé plus accessibles, plus efficaces et plus humains 
                grâce à la technologie. Nous croyons que chaque personne mérite un accès 
                rapide et de qualité aux soins médicaux.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre plateforme simplifie la prise de rendez-vous tout en maintenant 
                la qualité des soins et la sécurité des données. Nous travaillons 
                main dans la main avec des professionnels de santé qualifiés pour 
                offrir une expérience exceptionnelle à nos patients.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Certifié ISO 27001 pour la sécurité</span>
              </div>
            </div>

            {/* Espace pour photo mission */}
            <div className="relative animate-fade-in-right">
              <div className="bg-gray-100 rounded-3xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Target className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Image mission</p>
                  <p className="text-sm">à insérer ici</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre action quotidienne pour vous offrir 
              le meilleur service possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="bg-gray-100 group-hover:bg-gray-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
                  <value.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés et expérimentés au service de votre santé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Espace pour photo du membre */}
                <div className="bg-white rounded-xl p-8 mb-6 min-h-[200px] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Users className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Photo de {member.name}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1">{member.role}</div>
                  <div className="text-sm text-black font-medium mb-2">{member.specialty}</div>
                  <div className="text-xs text-gray-500 mb-3">{member.experience}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Faites partie des milliers de patients qui nous font confiance 
            pour leurs soins de santé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
            >
              <Link href="/protected/patient/contact" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Nous contacter
                
              </Link>
            </Button>
            
          </div>
        </div>
      </section>
    </main>
  );
}

