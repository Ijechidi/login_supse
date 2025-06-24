import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

/**
 * Composant d'alerte pour afficher les messages de succès ou d'erreur.
 * @param {Object} props
 * @param {string} props.message - Le message à afficher.
 * @param {'success' | 'error'} props.type - Le type de message (succès ou erreur).
 */
const AlertMessage: React.FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => {
  if (!message) return null;
  return (
    <Alert className={`mb-6 ${type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <AlertDescription className={type === 'success' ? 'text-green-800' : 'text-red-800'}>
          {message}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default AlertMessage; 