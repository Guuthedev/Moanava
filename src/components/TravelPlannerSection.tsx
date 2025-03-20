"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButtonCTA from "./ButtonCTA";
import SectionGradient from "./SectionGradient";

// Avantages d'utiliser un Travel Planner
const advantages = [
  {
    title: "Gain de temps précieux",
    description:
      "Évitez les heures de recherche et de planification grâce à mon expertise.",
  },
  {
    title: "Expertise locale authentique",
    description:
      "Accédez à des conseils basés sur une expérience réelle des destinations.",
  },
  {
    title: "Itinéraires personnalisés",
    description:
      "Chaque voyage est conçu exclusivement selon vos envies et votre rythme.",
  },
  {
    title: "Assistance continue",
    description:
      "Un accompagnement avant, pendant et après votre voyage pour une tranquillité totale.",
  },
];

export default function TravelPlannerSection() {
  return (
    <section id="travel-planner" className="py-24 relative overflow-hidden">
      {/* Motif décoratif */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 bg-primary/5 -skew-x-12 translate-x-1/4 z-0 overflow-hidden"
        aria-hidden="true"
      />

      {/* Dégradés animés en haut et en bas de la section avec couleurs inversées */}
      <SectionGradient
        colorClass="from-primary/20 to-transparent"
        topHeight="h-36"
        bottomHeight="h-36"
        opacity={0.7}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-full">
          {/* Image du Travel Planner */}
          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl max-w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/johanna/travel-planner.webp"
              alt="Johanna en tant que Travel Planner professionnelle organisant un voyage personnalisé"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </motion.div>

          {/* Contenu textuel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary font-display">
              <span className="text-primary">Pourquoi choisir</span>
              <span className="block">un Travel Planner ?</span>
            </h2>

            <p className="text-lg text-secondary/80 leading-relaxed">
              Contrairement aux agences de voyage traditionnelles, je crée des
              expériences authentiques et personnalisées, loin des circuits
              touristiques standardisés. Mon objectif : vous faire vivre le
              voyage qui vous ressemble vraiment.
            </p>

            <ul className="space-y-4 mt-8">
              {advantages.map((advantage, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">
                      {advantage.title}
                    </h3>
                    <p className="text-secondary/70">{advantage.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="pt-8">
              <Link
                href="/services"
                aria-label="En savoir plus sur mes services de Travel Planner"
              >
                <ButtonCTA size="md">Explorer mes services</ButtonCTA>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
