"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ButtonCTA from "./ButtonCTA";
import SectionGradient from "./SectionGradient";

interface HomeCTAProps {
  onContactClick?: () => void;
}

export default function HomeCTA({ onContactClick }: HomeCTAProps) {
  return (
    <section className="py-24 bg-primary/90 text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-10 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,181.3C840,171,960,181,1080,192C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </div>

      {/* Dégradés animés en haut et en bas de la section */}
      <SectionGradient
        colorClass="from-white/10 to-transparent"
        topHeight="h-40"
        bottomHeight="h-40"
        opacity={0.6}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
            Prêt à vivre votre <span className="text-secondary">aventure</span>{" "}
            ?
          </h2>

          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Partagez vos envies et vos rêves de voyage. Ensemble, créons une
            expérience inoubliable qui vous ressemble, loin des sentiers battus,
            en harmonie avec votre personnalité.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onContactClick}
              aria-label="Contactez Johanna pour un voyage sur mesure"
            >
              <ButtonCTA
                size="lg"
                className="bg-secondary text-primary hover:bg-secondary/90"
              >
                Me contacter
              </ButtonCTA>
            </button>

            <Link
              href="/services"
              aria-label="Découvrez les services de Travel Planner proposés par Johanna"
            >
              <ButtonCTA
                size="lg"
                variant="outline"
                className="text-white hover:bg-white/10"
              >
                Découvrir mes services
              </ButtonCTA>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
