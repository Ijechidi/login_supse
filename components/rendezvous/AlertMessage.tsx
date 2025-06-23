'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface AlertMessageProps {
  message: string;
  type: 'success' | 'error';
}

export default function AlertMessage({ message, type }: AlertMessageProps) {
  return (
    <Alert className={`mb-6 ${type === 'success' 
      ? 'border-green-200 bg-green-50' 
      : 'border-red-200 bg-red-50'}`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <AlertDescription className={type === 'success' 
          ? 'text-green-800' 
          : 'text-red-800'}
        >
          {message}
        </AlertDescription>
      </div>
    </Alert>
  );
}