"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ButtonCTA from "./ButtonCTA";
import SectionGradient from "./SectionGradient";

export default function JohannaSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-primary/10 relative overflow-hidden">
      {/* Vagues décoratives en arrière-plan */}
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-20"
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
            className="text-primary/30"
          />
        </svg>
      </div>

      {/* Dégradés animés en haut et en bas de la section */}
      <SectionGradient
        colorClass="from-primary/40 to-transparent"
        topHeight="h-36"
        bottomHeight="h-36"
        opacity={0.8}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-full">
          {/* Image avec effets d'animation */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl lg:order-2 aspect-[3/4] h-[500px] lg:h-[600px] max-w-full mx-auto lg:mx-0 w-full max-w-[400px] lg:max-w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/johanna/johanna-main.webp"
              alt="Johanna, votre Travel Planner professionnelle près d'un arbre tropical"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </motion.div>

          {/* Texte de présentation */}
          <motion.div
            className="lg:order-1 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary font-display">
              <span className="block">Johanna,</span>
              <span className="text-primary">Votre Travel Planner</span>
            </h2>

            <p className="text-lg text-secondary/80 leading-relaxed">
              Passionnée de voyages et amoureuse de la Polynésie française, je
              vous accompagne dans la création d&apos;expériences authentiques
              et personnalisées. Entre mon expertise locale et ma connaissance
              des destinations internationales, je crée pour vous des
              itinéraires uniques qui vous ressemblent.
            </p>

            <p className="text-lg text-secondary/80 leading-relaxed">
              Mon approche privilégie l&apos;échange, l&apos;écoute et
              l&apos;adaptation à vos envies pour des souvenirs qui resteront
              gravés dans votre mémoire.
            </p>

            <div className="pt-6">
              <Link
                href="/a-propos"
                aria-label="En savoir plus sur Johanna et son parcours"
              >
                <ButtonCTA size="md">Découvrir mon parcours</ButtonCTA>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
