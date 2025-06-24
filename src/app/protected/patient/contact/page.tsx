'use client';

import { useState } from 'react';
import Link from "next/link";
import { 
  Heart, 
  Phone, 
  MapPin, 
  Mail, 
  Send, 
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
}

interface ValidationErrors {
  nom?: string;
  email?: string;
  telephone?: string;
  sujet?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "+228 90 00 00 00",
      description: "Du lundi au vendredi, 8h-18h"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@careconnect.com",
      description: "Nous répondons sous 24h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Avedji, Lomé-Togo",
      description: "Consultations sur place disponibles"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven: 8h-18h",
      description: "Sam: 9h-12h, Fermé le dimanche"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!form.nom.trim()) {
      newErrors.nom = "Veuillez entrer votre nom";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Veuillez entrer votre email";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }
    
    if (form.telephone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(form.telephone)) {
      newErrors.telephone = "Veuillez entrer un numéro de téléphone valide";
    }
    
    if (!form.sujet.trim()) {
      newErrors.sujet = "Veuillez entrer un sujet";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Veuillez entrer votre message";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Votre message doit contenir au moins 10 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulation d'envoi de formulaire (à remplacer par un vrai appel API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage("Votre message a été envoyé avec succès. Notre équipe vous contactera dans les plus brefs délais.");
      setMessageType('success');
      
      // Réinitialiser le formulaire
      setForm({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      setMessage("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.");
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans votre parcours de soins.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-black font-medium mb-1">{info.content}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">
                  Envoyez-nous un message
                </h2>
                <p className="text-gray-300 mt-1">
                  Nous vous répondrons dans les plus brefs délais
                </p>
              </div>

              <div className="p-8">
                {/* Message d'état */}
                {message && (
                  <Alert className={`mb-6 ${messageType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-center gap-2">
                      {messageType === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <AlertDescription className={messageType === 'success' ? 'text-green-800' : 'text-red-800'}>
                        {message}
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">
                        Nom complet *
                      </Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className={errors.nom ? 'border-red-300 focus:ring-red-500' : ''}
                      />
                      {errors.nom && (
                        <p className="text-sm text-red-600">{errors.nom}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre.email@exemple.com"
                        className={errors.email ? 'border-red-300 focus:ring-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="telephone" className="text-sm font-semibold text-gray-700">
                        Téléphone
                      </Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        placeholder="+228 90 00 00 00"
                        className={errors.telephone ? 'border-red-300 focus:ring-red-500' : ''}
                      />
                      {errors.telephone && (
                        <p className="text-sm text-red-600">{errors.telephone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sujet" className="text-sm font-semibold text-gray-700">
                        Sujet *
                      </Label>
                      <Input
                        id="sujet"
                        name="sujet"
                        value={form.sujet}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        className={errors.sujet ? 'border-red-300 focus:ring-red-500' : ''}
                      />
                      {errors.sujet && (
                        <p className="text-sm text-red-600">{errors.sujet}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Détaillez votre demande ici..."
                      rows={6}
                      className={`resize-none ${errors.message ? 'border-red-300 focus:ring-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">{errors.message}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {form.message.length}/500 caractères (minimum 10)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
                <div className="aspect-[4/3] bg-gray-200">
                  {/* Ici, vous pourriez intégrer une carte Google Maps ou une image statique */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center p-8">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Carte interactive à intégrer ici</p>
                      <p className="text-sm text-gray-500 mt-2">Avedji, Lomé-Togo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Besoin d'un rendez-vous urgent ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Notre équipe médicale est disponible pour les consultations urgentes. 
                  Prenez rendez-vous en ligne ou appelez-nous directement.
                </p>
                <Button 
                  asChild 
                  className="w-full bg-black hover:bg-gray-800"
                >
                  <Link href="/protected/patient/rendez-vous" className="flex items-center gap-2 justify-center">
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Consultez notre FAQ pour trouver rapidement des réponses à vos questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Comment prendre rendez-vous sur CareConnect ?
              </h3>
              <p className="text-gray-600">
                Pour prendre rendez-vous, connectez-vous à votre compte, cliquez sur 'Prendre rendez-vous', 
                sélectionnez un médecin, choisissez une date et une heure disponible, indiquez le motif 
                de votre consultation, puis confirmez.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Les consultations sont-elles remboursées ?
              </h3>
              <p className="text-gray-600">
                Oui, les consultations médicales réalisées via CareConnect sont remboursées par l'assurance 
                maladie aux mêmes conditions qu'une consultation en cabinet. Une feuille de soins électronique 
                vous sera transmise automatiquement.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              asChild 
              variant="outline"
              className="border-2"
            >
              <Link href="/protected/patient/info/faq" className="flex items-center gap-2">
                Voir toutes les questions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      
      
    </main>
  );
}
