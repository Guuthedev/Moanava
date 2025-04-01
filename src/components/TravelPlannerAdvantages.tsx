"use client";

import { Compass, Globe, MapPin, PiggyBank } from "lucide-react";
import SectionTransition from "./SectionTransition";
import { CardHoverEffect } from "./ui/card-hover-effect";

const advantages = [
  {
    title: "Expert Local",
    description:
      "Vivant en Polynésie, je connais parfaitement les meilleures adresses et les bons plans locaux.",
    icon: Globe,
  },
  {
    title: "Voyage Sur Mesure",
    description:
      "Chaque itinéraire est unique, adapté à vos envies, votre budget et votre rythme.",
    icon: Compass,
  },
  {
    title: "Découverte Authentique",
    description:
      "Je vous guide vers des lieux authentiques, loin des sentiers battus du tourisme de masse.",
    icon: MapPin,
  },
  {
    title: "Optimisation Budget",
    description:
      "Je vous aide à optimiser votre budget en vous donnant accès aux meilleures offres locales.",
    icon: PiggyBank,
  },
];

export default function TravelPlannerAdvantages() {
  return (
    <SectionTransition direction="up">
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              <span className="text-secondary">Les</span>{" "}
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                avantages
              </span>
            </h2>
            <p className="text-xl text-secondary/80 max-w-2xl mx-auto">
              Je vous accompagne dans la création d&apos;un voyage unique et
              mémorable en Polynésie
            </p>
          </div>

          <CardHoverEffect items={advantages} />
        </div>
      </section>
    </SectionTransition>
  );
}
