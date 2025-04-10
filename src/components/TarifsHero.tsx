"use client";

import ButtonCTA from "@/components/ButtonCTA";
import ButtonCTA2 from "@/components/ButtonCTA2";
import { FlipWords } from "@/components/ui/flip-words";
import "@/styles/view-transitions.css";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionTransition from "./SectionTransition";

// Définition des types pour les props du contenu Hero
interface TarifsContentProps {
  subtitle: string;
  isVisible: boolean;
  keywords: string[];
}

const ConcurrentPopup = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const reasons = [
    "Tarifs cachés et suppléments imprévus",
    "Agences qui privilégient les partenariats lucratifs plutôt que vos envies",
    "Itinéraires standardisés sans personnalisation",
    "Pas de suivi pendant votre voyage",
    "Conseillers qui ne connaissent pas la destination",
    "Commissions cachées sur tous vos achats",
    "Services client difficiles à joindre",
    "Expériences touristiques de masse",
    "Urgences? Débrouillez-vous!",
    "Conseils génériques trouvables sur Google",
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay opaque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            suppressHydrationWarning={true}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl px-4 sm:px-6 md:px-8"
            suppressHydrationWarning={true}
          >
            <motion.div
              className="bg-primary rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mx-auto"
              transition={{ duration: 0.2 }}
              suppressHydrationWarning={true}
            >
              {/* Bouton de fermeture */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Contenu */}
              <div className="flex flex-col gap-6 relative">
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pourquoi ne pas contacter un concurrent?
                  </h3>
                  <div className="flex-1">
                    <p className="text-lg text-white/90 leading-relaxed">
                      Voici pourquoi choisir un Travel Planner indépendant comme
                      moi plutôt qu&apos;une agence de voyage traditionnelle:
                    </p>
                  </div>
                </div>

                {/* Liste des raisons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white/10 p-4 rounded-xl"
                    >
                      <span className="text-white">{reason}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <ButtonCTA
                    size="md"
                    className="bg-secondary text-primary hover:bg-primary/90 hover:text-secondary transition-all duration-300 text-base font-normal"
                    onClick={onClose}
                  >
                    J&apos;ai compris, je reste chez Moanava!
                  </ButtonCTA>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Composant TarifsContent séparé pour une meilleure organisation
const TarifsContent: React.FC<TarifsContentProps> = ({
  subtitle,
  isVisible,
  keywords,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Fonction pour le défilement fluide vers les ancres
  const scrollToAnchor = (anchorId: string) => {
    const element = document.getElementById(anchorId);
    if (element) {
      // Ajouter un petit offset pour éviter que l'élément soit caché par la navbar
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto text-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Titre principal (h1) avec effet de révélation */}
      <motion.h1
        id="tarifs-hero-heading"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-secondary font-display"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <span className="inline-flex flex-col items-center justify-center gap-y-2">
          Tarifs et Services
          <FlipWords
            words={keywords}
            duration={2500}
            className="text-primary/90 [text-shadow:_0_1px_0_var(--secondary)]"
          />
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
          Explorez mon expertise unique pour créer votre voyage de rêve ou
          sublimer votre marque avec des vidéos captivantes
        </motion.p>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-secondary/80 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 3, ease: "easeOut" }}
        >
          &ldquo;Investissez dans l&apos;excellence, confiez-moi votre vision et
          regardez-la prendre vie&rdquo;
        </motion.p>
      </motion.div>

      {/* Boutons CTA avec animations */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 1, delay: 3.2, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <ButtonCTA
            size="lg"
            className="group relative"
            aria-label="Voir les tarifs pour un voyage sur mesure en Polynésie"
            onClick={() => scrollToAnchor("travel-planner")}
          >
            Voyage sur mesure
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-sm font-normal">
              Voir les tarifs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </ButtonCTA>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <ButtonCTA2
            size="lg"
            className="group relative"
            aria-label="Voir les tarifs pour la création de vidéo promotionnelle"
            onClick={() => scrollToAnchor("video-creator")}
          >
            Vidéo promotionnelle
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-sm font-normal">
              Voir les tarifs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </ButtonCTA2>
        </motion.div>
      </motion.div>

      {/* Tags with benefits */}
      <motion.p
        className="mt-6 text-sm text-secondary/70 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
      >
        <span className="inline-block mx-1">
          <strong>Voyages internationaux</strong>
        </span>{" "}
        •
        <span className="inline-block mx-1">
          <strong>Prix vidéo promotionnelle</strong>
        </span>{" "}
        •<span className="inline-block mx-1">Formules personnalisées</span> •
        <span className="inline-block mx-1">Services détaillés</span> •
        <span className="inline-block mx-1">Options à la carte</span> •
        <span className="inline-block mx-1">Devis gratuits</span> •
        <span className="inline-block mx-1">Rapport qualité-prix</span>
      </motion.p>

      {/* Popup qui apparaît lorsqu'on clique sur "Contacter un concurrent" */}
      <ConcurrentPopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
    </motion.div>
  );
};

// Définition des types pour les props
interface TarifsHeroProps {
  subtitle?: string;
}

// Composant TarifsHero avec typage TypeScript
const TarifsHero: React.FC<TarifsHeroProps> = ({
  subtitle = "Consultez les tarifs détaillés de mes services de Travel Planner pour votre voyage partout dans le monde et de création vidéo pour votre entreprise.",
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

    const heroSection = document.getElementById("tarifs-hero-section");
    if (heroSection) observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tarifs-hero-section"
      className="relative w-full min-h-screen flex items-center justify-center"
      aria-labelledby="tarifs-hero-heading"
    >
      {/* Conteneur de l'image de fond */}
      <div
        className="fixed inset-0 w-full h-full overflow-hidden"
        style={{ zIndex: -10 }}
      >
        {/* Image de fond avec flou */}
        <div className="absolute inset-0 backdrop-blur-[8px]">
          <Image
            src="/images/johanna/johanna-mer.webp"
            alt="Fond tarifs Moanava"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Fond dégradé blanc léger */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Contenu */}
      <div className="container mx-auto relative px-4 max-w-[2000px]">
        <SectionTransition direction="up">
          <TarifsContent
            subtitle={subtitle}
            isVisible={isVisible}
            keywords={[
              " compétitifs",
              " avantageux",
              " transparents",
              " personnalisés",
              " abordables",
              " sans surprise",
              " internationaux",
            ]}
          />
        </SectionTransition>
      </div>
    </section>
  );
};

export default TarifsHero;
