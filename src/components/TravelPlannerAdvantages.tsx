"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Coins,
  Globe,
  HeartHandshake,
  Puzzle,
  ShieldX,
} from "lucide-react";
import SectionTransition from "./SectionTransition";

const advantages = [
  {
    title: "Sur-mesure & Personnalisé",
    description:
      "Je crée un itinéraire unique qui vous ressemble, adapté à vos envies, votre budget et votre rythme.",
    icon: Puzzle,
    comparison:
      "VS agences qui proposent des voyages pré-établis avec peu de personnalisation.",
    positiveHighlight: "VOYAGE UNIQUE",
  },
  {
    title: "Économie Garantie",
    description:
      "Mes tarifs sont fixes sans marges cachées, souvent plus économiques qu'une agence traditionnelle.",
    icon: Coins,
    comparison:
      "VS agences aux tarifs variables qui augmentent selon leurs marges et commissions.",
    positiveHighlight: "TARIFS TRANSPARENTS",
  },
  {
    title: "Liberté de Choix",
    description:
      "Je travaille avec un nombre illimité de prestataires locaux sans contraintes commerciales.",
    icon: Globe,
    comparison:
      "VS agences limitées aux prestataires avec lesquels elles ont des accords commerciaux.",
    positiveHighlight: "LIBERTÉ TOTALE",
  },
  {
    title: "Accompagnement Personnalisé",
    description:
      "Je vous guide tout au long du processus, de la planification à votre retour, avec une approche humaine.",
    icon: HeartHandshake,
    comparison:
      "VS relation commerciale basée uniquement sur la vente de produits touristiques.",
    positiveHighlight: "PRÉSENCE CONSTANTE",
  },
];

export default function TravelPlannerAdvantages() {
  return (
    <SectionTransition direction="up">
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                Travel Planner
              </span>{" "}
              <span className="text-secondary">VS Agence de Voyage</span>
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Découvrez pourquoi faire appel à un Travel Planner indépendant
              plutôt qu&apos;à une agence traditionnelle pour créer votre voyage
              sur mesure
            </p>
          </div>

          <div className="grid gap-10">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-xl p-8 overflow-hidden relative z-10 border border-primary/10 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="flex flex-col md:flex-row gap-6 items-start relative z-10 group-hover:opacity-0 transition-opacity duration-500">
                    {/* Icône et titre du Travel Planner */}
                    <div className="bg-primary/10 rounded-full p-4 mr-4 shrink-0 transition-all duration-300 group-hover:bg-primary/20">
                      <advantage.icon className="w-8 h-8 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h3 className="text-2xl font-bold text-primary">
                          {advantage.title}
                        </h3>
                      </div>
                      <p className="text-secondary mb-6">
                        {advantage.description}
                      </p>

                      {/* Ligne de séparation */}
                      <div className="border-t border-gray-200 my-4"></div>

                      {/* Partie Agence de voyage */}
                      <div className="flex items-start gap-2">
                        <ShieldX className="w-5 h-5 text-red-500 mt-1" />
                        <p className="text-secondary/70 italic text-sm">
                          {advantage.comparison}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message positif qui apparaît au survol et prend toute la place */}
                  <div className="absolute inset-0 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h4 className="text-4xl md:text-5xl font-bold text-primary text-center tracking-wider">
                      {advantage.positiveHighlight}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-primary/10 shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-6 relative z-10 text-center">
                Ce que je fais
              </h3>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 z-0"></div>

              <ul className="space-y-3 relative z-10">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je crée un carnet de voyage adapté à vos envies et votre
                    budget
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je vérifie les prix et disponibilités chez tous les
                    prestataires
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je vous guide dans les réservations sans intermédiaires
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je vous accompagne avant, pendant et après le voyage
                  </p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-primary/10 shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-secondary mb-6 relative z-10 text-center">
                Ce que je ne fais pas
              </h3>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 z-0"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 z-0"></div>

              <ul className="space-y-3 relative z-10">
                <li className="flex items-start gap-2">
                  <ShieldX className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je ne suis pas une agence de voyage immatriculée
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldX className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je ne vends pas de forfaits tout inclus avec réservations
                    déjà effectuées
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldX className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je n&apos;impose pas de packages pré-établis ou de circuits
                    standardisés
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldX className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <p className="text-secondary">
                    Je ne touche aucune commission sur les prestataires que je
                    vous recommande
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
