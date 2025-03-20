"use client";

import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import React, { useState } from "react";

// Définir une interface pour les exemples
interface ExampleContent {
  title: string;
  subtitle: string;
}

export default function HeroPage(): React.ReactElement {
  // Exemples de contenu pour démontrer les différentes options
  const examples: ExampleContent[] = [
    {
      title: "Moanava\nVotre voyage sur-mesure",
      subtitle:
        "Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier.",
    },
    {
      title: "Explorez la Polynésie autrement",
      subtitle:
        "Des expériences uniques sur mesure qui vous feront découvrir les trésors cachés de nos îles.",
    },
  ];

  const [currentExample, setCurrentExample] = useState<number>(0);

  const toggleExample = (): void => {
    setCurrentExample((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="relative">
      {/* Hero principal */}
      <Hero
        title={examples[currentExample].title}
        subtitle={examples[currentExample].subtitle}
      />

      {/* Bouton pour changer d'exemple - visible en bas de page */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleExample}
          className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300"
        >
          Changer d&apos;exemple
        </button>
      </div>

      {/* Section explicative en dessous du Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="container mx-auto py-20 px-4"
      >
        <h2 className="text-3xl font-bold mb-8 text-primary">
          Composant Hero Optimisé
        </h2>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-secondary">
            Caractéristiques
          </h3>

          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-primary mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Vidéo légère (1Mo) en arrière-plan avec image de secours
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-primary mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Détection intelligente de la qualité de connexion</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-primary mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Schéma JSON-LD intégré pour améliorer le référencement
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-primary mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Accessibilité optimisée avec attributs ARIA</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-primary mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Design responsive avec indication de défilement</span>
            </li>
          </ul>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              Utilisation
            </h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
              <code className="text-gray-200">
                {`<Hero 
  title="Votre titre principal"
  subtitle="Votre phrase d'accroche" 
/>`}
              </code>
            </pre>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              Optimisation de performance
            </h3>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Vidéo WebM légère (~1Mo) pour un chargement rapide</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Image WebP de secours pour les connexions très lentes
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Détection de la qualité de connexion pour adapter
                  l&apos;expérience
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Transitions fluides entre image et vidéo</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
