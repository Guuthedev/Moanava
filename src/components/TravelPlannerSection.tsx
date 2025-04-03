"use client";

import { motion } from "framer-motion";
import { Clock, Compass, Leaf, MapPin, PiggyBank, Users } from "lucide-react";
import SectionTransition from "./SectionTransition";
import { CardHoverEffect } from "./ui/card-hover-effect";

// Expertise et avantages d'un Travel Planner
const expertise = [
  {
    title: "Gain de temps",
    description:
      "Laissez-moi gérer la planification pendant que vous profitez de l'excitation du voyage à venir.",
    icon: Clock,
  },
  {
    title: "Économies garanties",
    description:
      "Bénéficiez de tarifs privilégiés et d'offres exclusives grâce à mes partenariats locaux.",
    icon: PiggyBank,
  },
  {
    title: "Expertise locale",
    description:
      "Une connaissance approfondie des îles et un réseau de contacts locaux pour des expériences uniques.",
    icon: Compass,
  },
  {
    title: "Sur mesure",
    description:
      "Un voyage 100% personnalisé selon vos envies, que vous voyagiez en famille, en couple ou en solo.",
    icon: Users,
  },
  {
    title: "Destinations authentiques",
    description:
      "Découvrez les vrais joyaux de la Polynésie, loin des sentiers battus.",
    icon: MapPin,
  },
  {
    title: "Tourisme responsable",
    description:
      "Des expériences respectueuses de l'environnement et des populations locales.",
    icon: Leaf,
  },
];

export default function TravelPlannerSection() {
  return (
    <SectionTransition direction="up">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-7xl mx-auto space-y-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* En-tête */}
            <div className="text-center space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold font-display">
                <span className="text-secondary">Voyagez</span>{" "}
                <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                  sur mesure en Polynésie
                </span>
              </h2>

              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-lg text-secondary/80 leading-relaxed">
                  Organiser un voyage parfait demande du temps et de
                  l&apos;expertise.
                </p>
                <p className="text-lg text-secondary/80 leading-relaxed">
                  En choisissant mes services, vous économisez non seulement
                  votre temps précieux mais aussi votre argent.
                </p>
                <p className="text-lg text-secondary/80 leading-relaxed">
                  Je sélectionne les meilleures offres, évite les pièges
                  touristiques et vous garantis des expériences authentiques.
                </p>
              </div>
            </div>

            {/* Section Expertise et Avantages */}
            <div className="space-y-8">
              <CardHoverEffect items={expertise} />
            </div>
          </motion.div>
        </div>
      </section>
    </SectionTransition>
  );
}
