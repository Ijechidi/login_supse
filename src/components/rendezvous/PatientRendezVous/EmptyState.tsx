// EmptyState.tsx
import React from 'react';
import { Calendar } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Calendar className="mx-auto w-12 h-12 text-gray-400 mb-4" />
      <p className="text-gray-500 text-lg">Aucun rendez-vous trouvé</p>
      <p className="text-gray-400">Modifiez vos filtres ou planifiez un nouveau rendez-vous</p>
    </div>
  );
};

export default EmptyState;