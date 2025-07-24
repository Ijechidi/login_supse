import * as React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { AvatarGroup, AvatarGroupTooltip } from '@/components/animate-ui/components/avatar-group';

type AvatarToolTipProps = {
  src?: string;          // URL de l'image
  fallback: string;      // Texte fallback (ex: initiales)
  tooltip?: string; // Contenu du tooltip (string uniquement)
  className?: string;    // Classes personnalisées
  sizePx?: number;       // Taille (en px)
};

export const AvatarToolTip: React.FC<AvatarToolTipProps> = ({
  src,
  fallback,
  tooltip,
  className,
  sizePx = 48,
}) => {
  const sizeStyle = { width: sizePx, height: sizePx };

  return (

    <Avatar className={`border-2 border-background ${className || ''}`} style={sizeStyle}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
      {tooltip && (
        <AvatarGroupTooltip>
          <p>{tooltip}</p>
        </AvatarGroupTooltip>
      )}
    </Avatar>
 
  );
};
