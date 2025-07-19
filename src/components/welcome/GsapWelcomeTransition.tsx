'use client';
import React, { useRef, useEffect, useState } from 'react';
import { WelcomeAnimation } from './WelcomeAnimation';
import { gsap } from 'gsap';
import CompleteUserProfileForm from '../user/CompleteUserProfileForm';

export default function GsapWelcomeTransition() {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (welcomeRef.current) {
      gsap.fromTo(
        welcomeRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );
      // Après 2.5s, fait disparaître WelcomeAnimation et fait apparaître le formulaire
      setTimeout(() => {
        gsap.to(welcomeRef.current, {
          y: -60,
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
          onComplete: () => setShowForm(true),
        });
      }, 3500);
    }
  }, []);

  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }
  }, [showForm]);

  return (
    <>
      {!showForm && (
        <div ref={welcomeRef} className="w-full flex justify-center">
          <WelcomeAnimation />
        </div>
      )}
      {showForm && (
        <div ref={formRef} className="w-full flex justify-center">
          <CompleteUserProfileForm />
        </div>
      )}
    </>
  );
} 