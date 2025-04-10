"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";

interface HomeCTAProps {
  onContactClick?: () => void;
}

export default function HomeCTA({ onContactClick }: HomeCTAProps) {
  return (
    <section
      className="min-h-screen w-full text-secondary relative flex items-center justify-center"
      aria-labelledby="home-cta-heading"
    >
      <div className="w-full px-4 relative z-10 flex items-center justify-center">
        <SectionTransition direction="up">
          <motion.div
            className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center bg-primary/20 rounded-3xl p-8 shadow-xl border border-primary/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2
              id="home-cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6 flex flex-col"
            >
              <span className="text-secondary mb-2">Votre voyage unique</span>
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                commence ici
              </span>
            </h2>

            <p className="text-lg md:text-xl text-secondary/90 max-w-3xl mx-auto mb-8">
              <strong>Travel Planner</strong> et{" "}
              <strong>créatrice vidéo</strong>, je sublime vos rêves
              d&apos;évasion en créant des voyages authentiques et des souvenirs
              impérissables.
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              Laissez-moi transformer votre prochain voyage en une expérience
              exclusive qui vous ressemble.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
              <ButtonCTA
                size="lg"
                className="bg-secondary text-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:text-secondary shadow-md group"
                onClick={onContactClick}
                aria-label="Contactez Johanna, votre Travel Planner et créatrice de contenu"
              >
                <span className="group-hover:animate-pulse">
                  Planifier mon voyage
                </span>
              </ButtonCTA>

              <Link
                href="/a-propos"
                aria-label="Découvrez qui est Johanna, votre Travel Planner et créatrice de contenu"
              >
                <ButtonCTA
                  size="lg"
                  variant="outline"
                  className="text-secondary hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:bg-secondary hover:text-primary border-secondary/30"
                >
                  Découvrir mon histoire
                </ButtonCTA>
              </Link>
            </div>

            <p className="mt-2 text-sm text-secondary/70 max-w-2xl mx-auto">
              <span className="inline-block mx-1">
                <strong>Travel Planner Polynésie</strong>
              </span>{" "}
              •
              <span className="inline-block mx-1">
                <strong>Vidéaste de voyage</strong>
              </span>{" "}
              •<span className="inline-block mx-1">Itinéraires sur mesure</span>{" "}
              •
              <span className="inline-block mx-1">
                Expériences authentiques
              </span>{" "}
              •
              <span className="inline-block mx-1">Conseils d&apos;initiée</span>{" "}
              •<span className="inline-block mx-1">Destinations secrètes</span>{" "}
              •
              <span className="inline-block mx-1">
                Accompagnement personnalisé
              </span>{" "}
              •<span className="inline-block mx-1">Destinations de rêve</span>
            </p>
          </motion.div>
        </SectionTransition>
      </div>
    </section>
  );
}
