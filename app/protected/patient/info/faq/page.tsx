'use client';

import { useState } from 'react';
import Link from "next/link";
import { 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  ArrowRight,
  HelpCircle,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: "Comment prendre rendez-vous sur CareConnect ?",
      answer: "Pour prendre rendez-vous, connectez-vous à votre compte, cliquez sur 'Prendre rendez-vous', sélectionnez un médecin, choisissez une date et une heure disponible, indiquez le motif de votre consultation, puis confirmez. Vous recevrez une confirmation par email.",
      category: "rendez-vous"
    },
    {
      question: "Puis-je annuler ou modifier mon rendez-vous ?",
      answer: "Oui, vous pouvez annuler ou modifier votre rendez-vous jusqu'à 24 heures avant l'heure prévue. Connectez-vous à votre compte, accédez à 'Mes rendez-vous', sélectionnez le rendez-vous concerné et cliquez sur 'Modifier' ou 'Annuler'.",
      category: "rendez-vous"
    },
    {
      question: "Comment se déroule une consultation en ligne ?",
      answer: "Pour une consultation en ligne, connectez-vous à votre compte 5 minutes avant l'heure prévue. Cliquez sur 'Mes rendez-vous' puis sur 'Rejoindre' pour la consultation concernée. Assurez-vous d'avoir une bonne connexion internet et que votre caméra et microphone fonctionnent correctement.",
      category: "consultations"
    },
    {
      question: "Les consultations en ligne sont-elles sécurisées ?",
      answer: "Oui, toutes nos consultations en ligne sont entièrement sécurisées et confidentielles. Nous utilisons un système de chiffrement de bout en bout pour protéger vos données et garantir la confidentialité de vos échanges avec le médecin.",
      category: "consultations"
    },
    {
      question: "Comment créer un compte sur CareConnect ?",
      answer: "Pour créer un compte, cliquez sur 'S'inscrire' en haut à droite de la page d'accueil. Remplissez le formulaire avec vos informations personnelles, acceptez les conditions d'utilisation et validez. Vous recevrez un email de confirmation pour activer votre compte.",
      category: "compte"
    },
    {
      question: "Comment récupérer mon mot de passe oublié ?",
      answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Se connecter' puis sur 'Mot de passe oublié'. Entrez votre adresse email et suivez les instructions envoyées pour réinitialiser votre mot de passe.",
      category: "compte"
    },
    {
      question: "Quels moyens de paiement sont acceptés ?",
      answer: "Nous acceptons les cartes de crédit (Visa, Mastercard), les virements bancaires et certaines mutuelles partenaires. Le paiement est sécurisé et vous recevrez une facture par email après chaque consultation.",
      category: "paiement"
    },
    {
      question: "Les consultations sont-elles remboursées par l'assurance maladie ?",
      answer: "Oui, les consultations médicales réalisées via CareConnect sont remboursées par l'assurance maladie aux mêmes conditions qu'une consultation en cabinet. Une feuille de soins électronique vous sera transmise automatiquement.",
      category: "paiement"
    },
    {
      question: "Comment contacter le support technique ?",
      answer: "Pour contacter notre support technique, vous pouvez envoyer un email à support@careconnect.com ou utiliser le formulaire de contact disponible sur notre site. Notre équipe est disponible du lundi au vendredi de 9h à 18h et vous répondra dans les plus brefs délais.",
      category: "support"
    },
    {
      question: "Que faire en cas d'urgence médicale ?",
      answer: "CareConnect n'est pas un service d'urgence. En cas d'urgence médicale, veuillez contacter immédiatement les services d'urgence (SAMU : 15, Pompiers : 18, Numéro d'urgence européen : 112) ou rendez-vous aux urgences de l'hôpital le plus proche.",
      category: "urgences"
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les questions' },
    { id: 'rendez-vous', name: 'Rendez-vous' },
    { id: 'consultations', name: 'Consultations' },
    { id: 'compte', name: 'Compte utilisateur' },
    { id: 'paiement', name: 'Paiement et remboursement' },
    { id: 'support', name: 'Support technique' },
    { id: 'urgences', name: 'Urgences' }
  ];

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Questions fréquemment posées
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement des réponses à vos questions concernant nos services, 
              la prise de rendez-vous, les consultations et plus encore.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items Section */}
      <section className="py-12 px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-8">{item.question}</h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <div className="pt-2 border-t"></div>
                      <p className="mt-4 text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Nous n'avons pas trouvé de réponse correspondant à votre recherche.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Réinitialiser la recherche
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-gray-600 mb-8">
            Notre équipe de support est disponible pour répondre à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              variant="outline"
              className="border-2"
            >
              <Link href="/contact">
                Contactez-nous
              </Link>
            </Button>
            <Button 
              asChild 
              className="bg-black hover:bg-gray-800"
            >
              <Link href="/protected/patient/rendez-vous" className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à prendre soin de votre santé ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Prenez rendez-vous avec l'un de nos médecins spécialistes dès aujourd'hui.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
          >
            <Link href="/protected/patient/rendez-vous" className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Prendre rendez-vous
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
