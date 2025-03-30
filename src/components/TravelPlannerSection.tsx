"use client";

import { motion } from "framer-motion";
import { Clock, Compass, Leaf, MapPin, PiggyBank, Users } from "lucide-react";
import { CardHoverEffect } from "./ui/card-hover-effect";

// Expertise et avantages d'un Travel Planner
const expertise = [
  {
    title: "Gain de temps et d'énergie",
    description:
      "Évitez des dizaines d'heures de recherche et de planification. Je m'occupe de tout pour vous, de la sélection des meilleurs hébergements à l'organisation des activités, en vous garantissant une expérience optimale.",
    icon: Clock,
  },
  {
    title: "Économies garanties",
    description:
      "Grâce à mon expertise et mes partenariats locaux, je vous fait bénéficier des meilleurs tarifs. En moyenne, mes clients économisent 15% sur leur voyage tout en profitant d'expériences de qualité supérieure.",
    icon: PiggyBank,
  },
  {
    title: "Expertise locale approfondie",
    description:
      "En tant que résidente de Tahiti, j'ai exploré chaque archipel de Polynésie et développé un réseau unique de contacts locaux fiables. Je vous guide vers les meilleures expériences authentiques.",
    icon: Compass,
  },
  {
    title: "Approche personnalisée",
    description:
      "Chaque voyageur est unique. Je prends le temps de comprendre vos attentes spécifiques pour créer un itinéraire qui vous correspond parfaitement, qu'il s'agisse de voyage en famille, en couple ou en solo.",
    icon: Users,
  },
  {
    title: "Destinations authentiques",
    description:
      "Évitez les pièges touristiques et découvrez les vrais joyaux de chaque destination. Je sélectionne uniquement les lieux que j'ai personnellement visités et validés, garantissant des expériences uniques.",
    icon: MapPin,
  },
  {
    title: "Tourisme responsable",
    description:
      "Je privilégie les expériences respectueuses de l'environnement et des populations locales. Des hébergements chez l'habitant aux guides locaux, chaque choix est pensé pour un impact positif.",
    icon: Leaf,
  },
];

// Services et accompagnement
const services = [
  {
    title: "Carnet de voyage sur-mesure",
    description:
      "Recevez un guide complet personnalisé avec itinéraire détaillé, cartes interactives, recommandations d'hébergements, transports, restaurants et activités adaptés à vos envies.",
    icon: Compass,
  },
  {
    title: "Conseils pratiques",
    description:
      "Bénéficiez de mes conseils avisés sur le climat, les visas, l'équipement nécessaire et les règles culturelles pour éviter les erreurs courantes et profiter pleinement de votre voyage.",
    icon: MapPin,
  },
  {
    title: "Support continu",
    description:
      "Je reste disponible avant et pendant votre voyage pour répondre à vos questions et vous guider en cas de besoin. Un accompagnement personnalisé pour une expérience sereine.",
    icon: Users,
  },
  {
    title: "Optimisation budgétaire",
    description:
      "Grâce à mes partenariats locaux et mon expertise, je vous aide à optimiser votre budget sans compromettre la qualité de votre voyage. Des bons plans exclusifs pour des expériences premium.",
    icon: PiggyBank,
  },
];

export default function TravelPlannerSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* En-tête */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary font-display">
              <span className="text-primary">Pourquoi choisir</span>
              <span className="block">un Travel Planner ?</span>
            </h2>

            <p className="text-lg text-secondary/80 leading-relaxed max-w-3xl mx-auto">
              Organiser un voyage parfait demande du temps et de
              l&apos;expertise. En choisissant mes services, vous économisez non
              seulement votre temps précieux mais aussi votre argent. Je
              sélectionne les meilleures offres, évite les pièges touristiques
              et vous garantis des expériences authentiques que vous ne
              trouveriez pas seul.
            </p>
          </div>

          {/* Section Expertise et Avantages */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-secondary text-center">
              Mon expertise et ma différenciation
            </h3>
            <CardHoverEffect items={expertise} />
          </div>

          {/* Section Services */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-secondary text-center">
              Mes services et accompagnement
            </h3>
            <CardHoverEffect items={services} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
