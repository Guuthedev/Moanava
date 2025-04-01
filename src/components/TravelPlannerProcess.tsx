"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, MessageSquare, Plane } from "lucide-react";
import SectionTransition from "./SectionTransition";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation initiale",
    description:
      "Nous échangeons sur vos envies, votre budget et vos contraintes pour créer un voyage sur mesure.",
  },
  {
    icon: Calendar,
    title: "Planification",
    description:
      "Je crée un itinéraire personnalisé avec les meilleures adresses et activités selon vos préférences.",
  },
  {
    icon: CheckCircle2,
    title: "Validation",
    description:
      "Vous validez l'itinéraire proposé et je procède aux réservations nécessaires.",
  },
  {
    icon: Plane,
    title: "Voyage",
    description:
      "Vous partez en toute sérénité avec un support disponible pendant votre séjour.",
  },
];

export default function TravelPlannerProcess() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <SectionTransition direction="up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              <span className="text-secondary">Comment</span>{" "}
              <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                ça marche ?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un processus simple et efficace pour créer votre voyage sur mesure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold mb-4">
              Prêt à commencer votre voyage ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Réservez une consultation gratuite pour discuter de votre projet
              de voyage.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Réserver une consultation
            </button>
          </motion.div>
        </SectionTransition>
      </div>
    </section>
  );
}
