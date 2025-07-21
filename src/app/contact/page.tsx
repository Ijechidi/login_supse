import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function page() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Contactez-nous</h1>
      <div className="bg-card border rounded-lg shadow-md p-8 space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="text-primary" />
          <span>123 Avenue de la Santé, 75000 Paris</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-primary" />
          <span>+33 1 23 45 67 89</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-primary" />
          <span>contact@careconnect.fr</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="text-primary" />
          <span>Lundi - Vendredi : 9h - 18h</span>
        </div>
      </div>
      <p className="text-center text-muted-foreground mt-8">Pour toute question, n'hésitez pas à nous écrire ou à nous appeler. Nous vous répondrons dans les plus brefs délais.</p>
    </div>
  );
}
