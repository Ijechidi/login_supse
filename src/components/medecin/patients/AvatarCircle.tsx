import React from 'react';

const Avatar = ({ src, fallback, className = "" }) => (
  <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ${className}`}>
    {src ? (
      <img
        src={src}
        alt={fallback}
        className="h-full w-full rounded-full object-cover"
      />
    ) : (
      <span className="text-sm font-medium text-gray-600">{fallback}</span>
    )}
  </div>
);

export interface PatientAvatar {
  id: string | number;
  src?: string;
  fallback: string;
  tooltip?: string;
}

export interface PatientsAvatarsProps {
  users: PatientAvatar[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

export default function CircularAvatars({ users, onSelect, selectedId }: PatientsAvatarsProps) {
  const circleRadius = 120; // Rayon du cercle en pixels
  const avatarCount = users.length;

  return (
    <div className="flex items-center justify-center ">
      <div 
        className="relative"
        style={{
          width: `${circleRadius * 2 + 48}px`, // +48 pour la taille des avatars
          height: `${circleRadius * 2 + 48}px`,
        }}
      >
        {/* Cercle de référence (optionnel, pour visualisation) */}
        <div 
          className="absolute border-2 border-dashed  rounded-full opacity-30"
          style={{
            width: `${circleRadius * 2}px`,
            height: `${circleRadius * 2}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {users.map((avatar, index) => {
          // Calculer l'angle pour chaque avatar
          const angle = (index * 2 * Math.PI) / avatarCount - Math.PI / 2; // -PI/2 pour commencer en haut
          
          // Calculer la position x, y sur le cercle (centré dans le conteneur)
          const x = (circleRadius * 2 + 48) / 2 + circleRadius * Math.cos(angle);
          const y = (circleRadius * 2 + 48) / 2 + circleRadius * Math.sin(angle);
          
          return (
            <div
              key={avatar.id ?? index}
              className={`absolute transition-all duration-300 hover:scale-110 hover:z-10 ${selectedId === avatar.id ? 'ring-2 ring-primary' : ''}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                cursor: onSelect ? 'pointer' : undefined,
              }}
              onClick={() => onSelect?.(String(avatar.id))}
            >
              <div className="group relative">
                <Avatar 
                  src={avatar.src} 
                  fallback={avatar.fallback}
                  className="border-3 border shadow-lg hover:shadow-xl transition-shadow duration-200"
                />
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                  {avatar.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Centre du cercle avec du contenu optionnel */}
        <div 
          className="absolute bg-accent/10  rounded-full shadow-lg flex items-center justify-center"
          style={{
            width: '80px',
            height: '80px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold ">{avatarCount}</div>
            <div className="text-xs ">Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
}