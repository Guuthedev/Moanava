"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ButtonCTA from "./ButtonCTA";

export default function JohannaSection() {
  return (
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
            vous accompagne dans la création d&apos;expériences authentiques et
            personnalisées. Entre mon expertise locale et ma connaissance des
            destinations internationales, je crée pour vous des itinéraires
            uniques qui vous ressemblent.
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
  );
}
