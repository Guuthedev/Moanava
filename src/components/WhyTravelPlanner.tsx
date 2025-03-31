"use client";

import { motion } from "framer-motion";
import { Compass, Globe, MapPin, Plane } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Expert Local",
    description:
      "Vivant en Polynésie, je connais parfaitement les meilleures adresses et les bons plans locaux.",
  },
  {
    icon: Compass,
    title: "Voyage Sur Mesure",
    description:
      "Chaque itinéraire est unique, adapté à vos envies, votre budget et votre rythme.",
  },
  {
    icon: MapPin,
    title: "Découverte Authentique",
    description:
      "Je vous guide vers des lieux authentiques, loin des sentiers battus du tourisme de masse.",
  },
  {
    icon: Plane,
    title: "Optimisation Budget",
    description:
      "Je vous aide à optimiser votre budget en vous donnant accès aux meilleures offres locales.",
  },
];

export default function WhyTravelPlanner() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Pourquoi Choisir Mes Services ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Je vous accompagne dans la création d&apos;un voyage unique et
            mémorable en Polynésie
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
