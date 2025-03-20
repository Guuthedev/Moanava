"use client";

import ButtonCTA from "@/components/ButtonCTA";
import { FlipWords } from "@/components/ui/flip-words";
import "@/styles/view-transitions.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionGradient from "./SectionGradient";

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
  // Au lieu de retourner null, on affiche toujours le contenu avec une classe d'opacité
  return (
    <motion.div
      className={`max-w-4xl mx-auto transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Titre principal (h1) avec effet de révélation et retour à la ligne */}
      <motion.h1
        id="hero-heading"
        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-secondary font-display text-center"
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
        className="space-y-4 mb-10"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.8 }}
      >
        <motion.p
          className="text-xl md:text-2xl text-secondary font-medium max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-secondary/80 mt-4"
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
        <button onClick={onContactClick} className="inline-block">
          <ButtonCTA size="lg">Commencez votre voyage</ButtonCTA>
        </button>
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
  schema?: Record<string, unknown> | null;
  onContactClick?: () => void;
}

// Composant Hero avec typage TypeScript
const Hero: React.FC<HeroProps> = ({
  subtitle = "Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier.",
  videoUrl = "/videos/vol-avion-opti.webm", // Chemin par défaut
  videoFallbackImage = "/videos/vol-avion-opti.webp", // Chemin par défaut
  videoAutoplay = true,
  videoMuted = true,
  videoLoop = true,
  schema = null,
  onContactClick,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true); // On démarre avec true pour garantir l'affichage

  useEffect(() => {
    // Logs pour débogage
    console.log("Tentative de chargement vidéo depuis:", videoUrl);
    console.log("Image fallback depuis:", videoFallbackImage);

    // Vérifier si les fichiers existent (simulé côté client)
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

    // Détection automatique de la qualité de connexion
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      // Typage spécifique pour l'API NetworkInformation
      interface NetworkInformation {
        effectiveType: string;
        downlink?: number;
        addEventListener: (type: string, listener: EventListener) => void;
        removeEventListener: (type: string, listener: EventListener) => void;
      }

      const connection = (
        navigator as Navigator & { connection?: NetworkInformation }
      ).connection;

      if (connection) {
        const { effectiveType, downlink } = connection;

        // Si débit vraiment trop faible (moins de 0.5 Mbps), on ne charge pas la vidéo
        if (
          ["slow-2g", "2g"].includes(effectiveType) ||
          (downlink && downlink < 0.5)
        ) {
          console.log("Connexion trop lente, affichage de l'image uniquement");
          setShouldLoadVideo(false);
        } else {
          setShouldLoadVideo(true);
        }

        // Événement pour surveiller les changements de connectivité
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
    } else {
      // Si API Connection non disponible, on charge quand même la vidéo car légère
      setShouldLoadVideo(true);
    }

    // Intersection Observer pour déclencher l'animation au bon moment
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

  // Microdata schema pour le SEO
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Moanava | Votre voyage sur-mesure",
    description:
      "Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier.",
    url: "https://www.moanava.com",
    telephone: "+33600000000",
    areaServed: [
      {
        "@type": "Country",
        name: "Polynésie française",
      },
      {
        "@type": "Place",
        name: "Monde entier",
      },
    ],
    makesOffer: {
      "@type": "Offer",
      name: "Voyages sur mesure en Polynésie française et partout ailleurs",
      description: subtitle,
    },
    founder: {
      "@type": "Person",
      name: "Johanna",
      jobTitle: "Travel Planner",
    },
    sameAs: [
      "https://www.facebook.com/520849857787552",
      "https://www.instagram.com/moanava_travel.planner/",
    ],
    logo: {
      "@type": "ImageObject",
      url: "https://www.moanava.com/logo/logo-big-moanava.webp",
    },
  };

  const finalSchema = schema || defaultSchema;

  return (
    <>
      {/* 🎥 VIDÉO FIXE EN ARRIÈRE-PLAN AVEC FILTRE PRIMARY */}
      <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
        {/* Fallback WebP affiché d'abord ou en cas de connexion lente */}
        <Image
          src={videoFallbackImage}
          alt="Vue aérienne de la Polynésie"
          fill
          priority
          sizes="100vw"
          className={`object-cover ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          } transition-opacity duration-1000`}
          onError={() =>
            console.error("Erreur de chargement de l'image fallback")
          }
        />

        {shouldLoadVideo && (
          <video
            autoPlay={videoAutoplay}
            muted={videoMuted}
            loop={videoLoop}
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
            aria-hidden="true"
            onLoadedData={() => {
              console.log("Vidéo chargée avec succès");
              setIsVideoLoaded(true);
            }}
            onError={(e) => {
              console.error("Erreur de chargement vidéo:", e);
              setIsVideoLoaded(false);
              setShouldLoadVideo(false);
            }}
          >
            <source src={videoUrl} type="video/webm" />
          </video>
        )}

        {/* Filtre de couleur avec overlay gradient pour meilleure lisibilité */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/30 via-primary/20 to-primary/40 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>

      {/* 📌 HERO SECTION */}
      <section
        id="hero-section"
        className="w-full relative flex items-center justify-center min-h-screen text-white text-center px-6 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {finalSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
          />
        )}

        {/* Dégradé de bas de section uniquement */}
        <SectionGradient
          colorClass="from-primary/40 to-transparent"
          topHeight="h-0"
          bottomHeight="h-40"
          opacity={0.9}
        />

        {/* Contenu principal avec animations synchronisées - Maintenant un composant séparé avec z-index élevé */}
        <div className="container mx-auto relative z-20">
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

        {/* Indicateur de défilement */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 10, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
