'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ScrollTransitionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  duration?: number;
  trigger?: 'viewport' | 'partial';
}

export function ScrollTransition({ 
  children, 
  delay = 0,
  direction = 'up',
  distance = 60,
  duration = 1.2,
  trigger = 'partial'
}: ScrollTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Configuration des directions d'animation (sans scale)
    const getInitialTransform = () => {
      switch (direction) {
        case 'up': return { opacity: 0, y: distance };
        case 'down': return { opacity: 0, y: -distance };
        case 'left': return { opacity: 0, x: distance };
        case 'right': return { opacity: 0, x: -distance };
        case 'fade': return { opacity: 0 };
        default: return { opacity: 0, y: distance };
      }
    };

    const getFinalTransform = () => {
      return { 
        opacity: 1, 
        x: 0, 
        y: 0,
        duration,
        delay,
        ease: 'power2.out', // Plus fluide que power3.out
      };
    };

    const getExitTransform = () => {
      const initial = getInitialTransform();
      return {
        ...initial,
        duration: duration * 0.5,
        ease: 'power1.in' // Plus doux
      };
    };

    // État initial
    gsap.set(el, getInitialTransform());

    // Configuration de l'observer avec différents seuils selon le trigger
    const thresholdValue = trigger === 'viewport' ? 0.6 : 0.2;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animation d'entrée fluide et simple
            gsap.to(el, getFinalTransform());
          } else if (trigger === 'viewport') {
            // Animation de sortie seulement si trigger est 'viewport'
            gsap.to(el, getExitTransform());
          }
        });
      },
      { 
        threshold: thresholdValue,
        rootMargin: '0px 0px -30px 0px' // Déclenche de manière plus fluide
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, distance, duration, trigger]);

  return (
    <div 
      ref={ref} 
      style={{ 
        willChange: 'transform, opacity',
        // Optimisations pour une meilleure fluidité
        transform: 'translateZ(0)', // Force l'accélération hardware
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
}