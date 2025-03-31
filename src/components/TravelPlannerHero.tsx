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
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-secondary font-display relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <span className="inline-flex flex-col items-center justify-center gap-y-2">
          Johanna
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl relative z-10">
            Travel Planner
          </span>
          <FlipWords
            words={keywords}
            duration={2500}
            className="text-primary/90 relative z-10"
          />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl relative z-10">
            en Polynésie, et ailleurs
          </span>
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
          className="text-lg sm:text-xl md:text-2xl text-secondary font-medium max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          {subtitle}
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
          Parlez-moi de votre projet de voyage
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
const TravelPlannerHero: React.FC<HeroProps> = ({
  subtitle = "Découvrez la Polynésie française à travers des expériences authentiques et personnalisées, guidées par une experte locale.",
  onContactClick,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Intersection Observer
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
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center"
    >
      {/* Conteneur de l'image de fond */}
      <div className="fixed inset-0 w-full h-full -z-10">
        {/* Image de fond */}
        <Image
          src="/images/johanna/massage.webp"
          alt="Massage polynésien"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/55 via-primary/10 to-primary/20"
          aria-hidden="true"
        />
      </div>

      {/* Contenu */}
      <div className="container mx-auto relative z-20 px-4 max-w-[2000px]">
        <SectionTransition direction="up">
          <HeroContent
            subtitle={subtitle}
            isVisible={isVisible}
            keywords={[
              " consciencieuse",
              " expérimentée",
              " efficace",
              " accessible",
              " passionnée",
              " locale",
              " à l'écoute",
            ]}
            onContactClick={onContactClick}
          />
        </SectionTransition>
      </div>
    </section>
  );
};

export default TravelPlannerHero;
