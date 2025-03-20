"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import SectionGradient from "./SectionGradient";

// Données des témoignages
const testimonials = [
  {
    id: 1,
    name: "Sophie et Pierre",
    trip: "Lune de miel à Bora Bora",
    image: "/images/johanna/johannarbre.webp", // À remplacer par une image de clients
    text: "Johanna a conçu notre lune de miel de rêve en Polynésie. Chaque détail était parfait, des hébergements aux activités. Son expertise locale nous a permis de découvrir des endroits secrets que nous n'aurions jamais trouvés seuls.",
    rating: 5,
  },
  {
    id: 2,
    name: "Famille Martin",
    trip: "Tour du monde en famille",
    image: "/images/johanna/travel-planner.webp", // À remplacer par une image de clients
    text: "Johanna a réussi l'exploit d'organiser un voyage qui a plu à toute la famille, des plus petits aux grands-parents. Sa capacité à comprendre nos attentes et à les transformer en itinéraire cohérent est exceptionnelle.",
    rating: 5,
  },
  {
    id: 3,
    name: "Laurent",
    trip: "Trek en Nouvelle-Zélande",
    image: "/images/johanna/joli-palmier.webp", // À remplacer par une image de clients
    text: "En tant que voyageur solo exigeant, j'avais des demandes spécifiques. Johanna a parfaitement saisi mes attentes et m'a proposé un itinéraire sur mesure qui correspondait exactement à ce que je recherchais.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-secondary/5 overflow-hidden relative">
      {/* Dégradés animés en haut et en bas de la section */}
      <SectionGradient
        colorClass="from-secondary/20 to-transparent"
        topHeight="h-40"
        bottomHeight="h-40"
        opacity={0.7}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 max-w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary font-display mb-4">
            Ils ont voyagé avec <span className="text-primary">Johanna</span>
          </h2>
          <p className="text-xl text-secondary/70 max-w-3xl mx-auto">
            Découvrez les expériences de voyage uniques et personnalisées que
            j&apos;ai eu le plaisir de créer pour mes clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Élément décoratif */}
              <div
                className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              />

              {/* En-tête du témoignage */}
              <div className="flex items-center space-x-4 mb-6 relative z-10">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-primary/80 text-sm">{testimonial.trip}</p>

                  {/* Étoiles de notation */}
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Texte du témoignage */}
              <blockquote className="relative z-10">
                <p className="text-secondary/80 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
