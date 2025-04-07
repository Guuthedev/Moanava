"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import SectionTransition from "./SectionTransition";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: "Comment sont définis vos tarifs ?",
    answer:
      "J'ai à cœur de vous proposer un carnet de voyage le plus détaillé possible, et qui vous colle à la peau à 100%. Plus le voyage est long, plus le travail d'organisation est conséquent, ce qui explique les différences de tarifs selon la durée.",
  },
  {
    question:
      "Y a-t-il des suppléments pour certaines destinations comme la Polynésie ?",
    answer:
      "Bien que la Polynésie soit complexe à organiser, j'ai conscience qu'un tel voyage représente déjà un budget conséquent. Je ne gonfle donc pas mes prix pour cette destination, afin de la rendre accessible au plus grand nombre.",
  },
  {
    question: "Proposez-vous des réductions ?",
    answer:
      "Oui, plusieurs réductions sont disponibles : -10% si vous réservez un an à l'avance ou à partir de la deuxième commande. -15% si un an à l'avance et mini deuxième commande.",
  },
  {
    question:
      "Pourquoi recommandez-vous de réserver un an à l'avance pour la Polynésie ?",
    answer: (
      <div className="space-y-2">
        <p>Pour plusieurs raisons :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Les îles sont petites : les hébergements à prix abordables sont les
            premiers complets.
          </li>
          <li>
            Les vols inter-îles se font dans des petits avions, eux aussi vite
            complets. De plus, certaines îles ne sont pas desservies tous les
            jours.
          </li>
          <li>
            Les îles peu touristiques possèdent peu d'hébergements touristiques
            (parfois 1 voire 2 par île), d'où l'importance de réserver le plus
            tôt possible, si vous souhaitez sortir des sentiers battus.
          </li>
          <li>
            Un voyage organisé 1 an à l'avance sera forcément plus optimal qu'un
            voyage réservé à 6 mois du départ.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "Qu'incluent vos formules exactement ?",
    answer:
      "Toutes les formules incluent un itinéraire personnalisé, des conseils locaux et un support pendant le voyage. Les formules Manu Reva et Moana Nui incluent également des réservations assistées, et le carnet de voyage digital est inclus dans ces deux formules (Manu Reva et Moana Nui).",
  },
  {
    question: "Que signifie 'Réservations assistées' ?",
    answer:
      "Au moment de la remise du carnet de voyage, toutes les prestations sont réalisables aux dates indiquées, la disponibilité a été vérifiée. Je vous guide tout au long du processus pour vous assurer des réservations optimales.",
  },
];

const FAQComponent: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="text-secondary">FAQ</span>{" "}
        <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
          Tarifs
        </span>
      </h2>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-muted rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openItems[index] ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {openItems[index] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 border-t border-muted bg-background/50">
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TarifsFAQ() {
  return (
    <SectionTransition direction="up">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FAQComponent />
        </div>
      </section>
    </SectionTransition>
  );
}
