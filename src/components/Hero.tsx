"use client";

import ButtonCTA from "@/components/ButtonCTA";
import { FlipWords } from "@/components/ui/flip-words";
import "@/styles/view-transitions.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionTransition from "./SectionTransition";

// Définition des types pour les props du contenu Hero
interface HeroContentProps {
  subtitle: string;
  isVisible: boolean;
  keywords: string[];
  onContactClick?: () => void;
}

// Composant HeroContent séparé pour une meilleure organisation
const HeroContent: React.FC<HeroContentProps> = ({
  subtitle,
  isVisible,
  keywords,
  onContactClick,
}) => {
  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto text-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Titre principal (h1) avec effet de révélation */}
      <motion.h1
        id="hero-heading"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-secondary font-display"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <span className="inline-flex flex-col items-center justify-center gap-y-2">
          Des voyages
          <FlipWords
            words={keywords}
            duration={2500}
            className="text-primary/90 [text-shadow:_0_1px_0_var(--secondary)]"
          />
          avec Moanava
        </span>
      </motion.h1>

      {/* Phrases d'accroche avec animation séquentielle */}
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.8 }}
      >
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-secondary font-medium max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-secondary/80"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
        >
          Un voyage authentique, conçu sur mesure, juste pour vous
        </motion.p>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-secondary/80 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 3, ease: "easeOut" }}
        >
          &ldquo;Voyagez serein, je trace votre chemin !&rdquo;
        </motion.p>
      </motion.div>

      {/* CTA Button avec effet de bordure */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 1, delay: 3.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <ButtonCTA size="lg" onClick={onContactClick}>
          Commencez votre voyage
        </ButtonCTA>
      </motion.div>
    </motion.div>
  );
};

// Définition des types pour les props
interface HeroProps {
  subtitle?: string;
  onContactClick?: () => void;
}

// Composant Hero avec typage TypeScript
const Hero: React.FC<HeroProps> = ({
  subtitle = "Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier.",
  onContactClick,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const heroSection = document.getElementById("hero-section");
    if (heroSection) observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      {/* Conteneur de l'image de fond */}
      <div
        className="fixed inset-0 w-full h-full overflow-hidden"
        style={{ zIndex: -10 }}
      >
        {/* Image de fond avec flou */}
        <div className="absolute inset-0 backdrop-blur-[8px]">
          <Image
            src="/images/destinations/Hero.webp"
            alt="Johanna au bord de la mer"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        {/* Fond dégradé blanc léger */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Contenu */}
      <div className="container mx-auto relative px-4 max-w-[2000px]">
        <SectionTransition direction="up">
          <HeroContent
            subtitle={subtitle}
            isVisible={isVisible}
            keywords={[
              " sur mesure",
              " en Polynésie",
              " authentiques",
              " inoubliables",
              " dans le monde",
              " sans agence",
              " en toute sérénité",
            ]}
            onContactClick={onContactClick}
          />
        </SectionTransition>
      </div>
    </section>
  );
};

export default Hero;
