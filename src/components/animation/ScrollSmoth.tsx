'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GsapViewTransitionProps {
  first: React.ReactNode;
  second: React.ReactNode;
  delay?: number; // délai avant transition
  duration?: number; // durée des animations
  ease?: string; // easing GSAP
}

export default function ScrollSmoth({
  first,
  second,
  delay = 3500,
  duration = 1,
  ease = 'power2.out',
}: GsapViewTransitionProps) {
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    if (firstRef.current) {
      gsap.fromTo(
        firstRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration, ease }
      );

      setTimeout(() => {
        gsap.to(firstRef.current, {
          y: -60,
          opacity: 0,
          duration,
          ease: 'power2.in',
          onComplete: () => setShowSecond(true),
        });
      }, delay);
    }
  }, [delay, duration, ease]);

  useEffect(() => {
    if (showSecond && secondRef.current) {
      gsap.fromTo(
        secondRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration, ease }
      );
    }
  }, [showSecond, duration, ease]);

  return (
    <>
      {!showSecond && (
        <div ref={firstRef} className="w-full h-full min-h-[400px] flex justify-center">
          {first}
        </div>
      )}
      {showSecond && (
        <div ref={secondRef} className="w-full flex justify-center">
          {second}
        </div>
      )}
    </>
  );
}
