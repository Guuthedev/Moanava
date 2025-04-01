"use client";

import { Check } from "lucide-react";
import ButtonCTA from "./ButtonCTA";
import SectionTransition from "./SectionTransition";

const formules = [
  {
    title: "Formule Va'a",
    description: "Du simple au long week-end",
    duration: "De 2 à 5 jours",
    capacity: "1 à 4 personnes",
    price: "55€/jour",
    features: [
      "1 hébergement",
      "Itinéraire personnalisé",
      "Conseils locaux",
      "Support pendant le voyage",
    ],
    popular: false,
  },
  {
    title: "Formule Manu Reva",
    description: "Un citytrip ou une semaine de vacances",
    duration: "De 3 à 7 jours",
    capacity: "1 à 4 personnes",
    price: "60€/jour",
    features: [
      "1 hébergement",
      "Itinéraire personnalisé",
      "Conseils locaux",
      "Support pendant le voyage",
      "Réservations assistées",
    ],
    popular: true,
  },
  {
    title: "Formule Moana Nui",
    description: "Au-delà d'une semaine jusqu'à 4 semaines",
    duration: "Plus d'une semaine",
    capacity: "1 à 4 personnes",
    price: "70€/jour",
    features: [
      "Plusieurs hébergements possibles",
      "Itinéraire personnalisé",
      "Conseils locaux",
      "Support pendant le voyage",
      "Réservations assistées",
      "Carnet de voyage digital",
    ],
    popular: false,
  },
];

export default function TravelPlannerFormules() {
  return (
    <SectionTransition direction="up">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              <span className="text-secondary">Nos</span>{" "}
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                formules
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choisissez la formule qui correspond le mieux à vos envies de
              voyage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formules.map((formule) => (
              <div key={formule.title}>
                <div
                  className={`relative ${formule.popular ? "lg:-mt-4" : ""}`}
                >
                  {formule.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-secondary text-primary px-4 py-1 rounded-full text-sm font-medium">
                        La plus populaire
                      </span>
                    </div>
                  )}
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-2">{formule.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {formule.description}
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-secondary" />
                        <span>{formule.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-secondary" />
                        <span>{formule.capacity}</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-6">
                      {formule.price}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {formule.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-secondary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonCTA
                      className="w-full"
                      variant={formule.popular ? "primary" : "outline"}
                    >
                      Réserver une consultation
                    </ButtonCTA>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">
              Besoin d&apos;une formule personnalisée ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pour les voyages de noce, les grandes randonnées ou tout autre
              projet spécifique, je vous propose un devis personnalisé adapté à
              vos besoins.
            </p>
            <ButtonCTA
              size="lg"
              className="bg-secondary text-primary hover:bg-primary/90 hover:text-secondary"
            >
              Demander un devis personnalisé
            </ButtonCTA>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
