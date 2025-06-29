"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WelcomeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring" }}
        className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center"
      >
        Bienvenue sur CareConnect !
      </motion.h1>
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-xl"
      >
        Nous sommes ravis de vous accueillir sur la plateforme dédiée à votre santé. Prenez rendez-vous, échangez avec des médecins et gérez votre parcours de soins en toute simplicité.
      </motion.p>
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1.2 }}
        className="rounded-full bg-primary/10 p-6 shadow-lg"
      >
        <Link href="/patient/step">  
        <Heart className="w-10 h-10 animate-pulse text-primary" />
        </Link>

      </motion.div>
    </div>
  );
} 