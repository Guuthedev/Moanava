"use client";

import ButtonCTA from "@/components/ButtonCTA";
import { FlipWords } from "@/components/ui/flip-words";
import "@/styles/view-transitions.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <span className="inline-flex flex-wrap items-center justify-center gap-x-2">
          Des voyages{" "}
          <FlipWords
            words={keywords}
            duration={2500}
            className="text-primary"
          />{" "}
          avec Johanna
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
  videoUrl?: string;
  videoFallbackImage?: string;
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
  onContactClick?: () => void;
}

// Interface pour l'API NetworkInformation
interface NetworkInformation {
  effectiveType: string;
  downlink?: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

// Composant Hero avec typage TypeScript
const Hero: React.FC<HeroProps> = ({
  subtitle = "Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier.",
  videoUrl = "/videos/vol-avion-opti.webm",
  videoFallbackImage = "/videos/vol-avion-opti.webp",
  videoAutoplay = true,
  videoMuted = true,
  videoLoop = true,
  onContactClick,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Vérifier si les fichiers existent
    const checkFileExists = async (url: string): Promise<boolean> => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
      } catch (error) {
        console.error(`Erreur lors de la vérification de ${url}:`, error);
        return false;
      }
    };

    // Vérification asynchrone des fichiers
    const verifyFiles = async () => {
      const videoExists = await checkFileExists(videoUrl);
      if (!videoExists) {
        console.warn(`La vidéo à ${videoUrl} n'a pas été trouvée.`);
        setShouldLoadVideo(false);
      }
    };

    verifyFiles();

    // Détection de la qualité de connexion
    if (typeof window !== "undefined" && "connection" in navigator) {
      const connection = (
        navigator as Navigator & { connection?: NetworkInformation }
      ).connection;
      if (connection) {
        const { effectiveType, downlink } = connection;
        if (
          ["slow-2g", "2g"].includes(effectiveType) ||
          (downlink && downlink < 0.5)
        ) {
          setShouldLoadVideo(false);
        } else {
          setShouldLoadVideo(true);
        }

        const updateConnectionStatus = () => {
          const { effectiveType, downlink } = connection;
          if (
            ["slow-2g", "2g"].includes(effectiveType) ||
            (downlink && downlink < 0.5)
          ) {
            setShouldLoadVideo(false);
          } else if (!isVideoLoaded) {
            setShouldLoadVideo(true);
          }
        };

        connection.addEventListener("change", updateConnectionStatus);
        return () =>
          connection.removeEventListener("change", updateConnectionStatus);
      }
    }

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
  }, [isVideoLoaded, videoUrl, videoFallbackImage]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-primary/5">
      {/* Conteneur de la vidéo et de l'image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        {/* Image de fallback */}
        <Image
          src={videoFallbackImage}
          alt="Vidéo de fond"
          fill
          className="object-cover"
          priority
        />

        {/* Vidéo */}
        {shouldLoadVideo && (
          <video
            autoPlay={videoAutoplay}
            muted={videoMuted}
            loop={videoLoop}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={videoUrl} type="video/webm" />
          </video>
        )}

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/20 via-primary/10 to-primary/20"
          aria-hidden="true"
        />
      </div>

      {/* Contenu */}
      <div className="container mx-auto relative z-20 px-4">
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
      </div>
    </section>
  );
};

export default Hero;
