"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building,
  Compass,
  Globe,
  Heart,
  MapPin,
  Mountain,
  Plane,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import ButtonCTA from "./ButtonCTA";
import ContactFormPopup from "./ContactFormPopup";
import { CardHoverEffect } from "./ui/card-hover-effect";

// Types pour les formules de prix
interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
  tooltip?: string;
  showInCard?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText: string;
  badge?: string;
}

interface PricingComponentProps {
  title: React.ReactNode;
  subtitle?: string;
  plans: PricingPlan[];
  onSelectPlan: (planId: string) => void;
  showComparison?: boolean;
}

// Fonctionnalités communes à toutes les formules (à afficher uniquement dans le tableau comparatif)
const commonFeatures: PricingFeature[] = [
  {
    id: "capacite",
    name: "1 à 4 personnes",
    included: true,
    showInCard: false,
    tooltip:
      "Toutes nos formules sont adaptées pour des groupes de 1 à 4 personnes",
  },
  {
    id: "itineraire",
    name: "Itinéraire personnalisé",
    included: true,
    showInCard: false,
    tooltip:
      "Un itinéraire sur mesure créé selon vos goûts, votre budget et vos envies spécifiques",
  },
  {
    id: "conseils",
    name: "Conseils locaux",
    included: true,
    showInCard: false,
    tooltip: "Des conseils d'initiée pour profiter pleinement de votre séjour",
  },
  {
    id: "reservations",
    name: "Réservations assistées",
    included: true,
    tooltip:
      "Je m'assure de la disponibilité et des tarifs avant la communication du carnet de voyage",
    showInCard: false,
  },
  {
    id: "carnet",
    name: "Carnet de voyage digital",
    included: true,
    tooltip:
      "Un guide numérique complet avec tous vos itinéraires, réservations et recommandations",
    showInCard: false,
  },
  {
    id: "support",
    name: "Support pendant le voyage",
    included: true,
    showInCard: false,
    tooltip:
      "Je reste disponible pendant votre voyage via WhatsApp pour répondre à vos questions",
  },
];

// Configuration des plans tarifaires
const pricingPlans: PricingPlan[] = [
  {
    id: "vaa",
    name: "Formule Va'a",
    description: "Du simple au long week-end",
    price: 55,
    currency: "€",
    period: "jour",
    badge: "",
    popular: false,
    ctaText: "Réserver une consultation",
    features: [
      { id: "duree", name: "De 2 à 5 jours", included: true, showInCard: true },
      {
        id: "hebergement",
        name: "1 hébergement",
        included: true,
        showInCard: true,
      },
      ...commonFeatures,
      {
        id: "reservations",
        name: "Réservations assistées",
        included: true,
        tooltip:
          "Je m'assure de la disponibilité et des tarifs avant la communication du carnet de voyage",
        showInCard: false,
      },
      {
        id: "carnet",
        name: "Carnet de voyage digital",
        included: true,
        tooltip:
          "Un guide numérique complet avec tous vos itinéraires, réservations et recommandations",
        showInCard: false,
      },
    ],
  },
  {
    id: "manu-reva",
    name: "Formule Manu Reva",
    description: "Un citytrip ou une semaine de vacances",
    price: 60,
    currency: "€",
    period: "jour",
    badge: "",
    popular: false,
    ctaText: "Réserver une consultation",
    features: [
      { id: "duree", name: "De 3 à 7 jours", included: true, showInCard: true },
      {
        id: "hebergement",
        name: "2 hébergements",
        included: true,
        showInCard: true,
      },
      ...commonFeatures,
      {
        id: "reservations",
        name: "Réservations assistées",
        included: true,
        tooltip:
          "Je m'assure de la disponibilité et des tarifs avant la communication du carnet de voyage",
        showInCard: false,
      },
      {
        id: "carnet",
        name: "Carnet de voyage digital",
        included: true,
        tooltip:
          "Un guide numérique complet avec tous vos itinéraires, réservations et recommandations",
        showInCard: false,
      },
    ],
  },
  {
    id: "moana-nui",
    name: "Formule Moana Nui",
    description: "Au-delà d'une semaine jusqu'à 4 semaines",
    price: 70,
    currency: "€",
    period: "jour",
    badge: "La plus populaire",
    popular: true,
    ctaText: "Réserver une consultation",
    features: [
      {
        id: "duree",
        name: "Plus d'une semaine",
        included: true,
        showInCard: true,
      },
      {
        id: "hebergement",
        name: "Multiples hébergements",
        included: true,
        showInCard: true,
      },
      ...commonFeatures,
      {
        id: "reservations",
        name: "Réservations assistées",
        included: true,
        tooltip:
          "Je m'assure de la disponibilité et des tarifs avant la communication du carnet de voyage",
        showInCard: false,
      },
      {
        id: "carnet",
        name: "Carnet de voyage digital",
        included: true,
        tooltip:
          "Un guide numérique complet avec tous vos itinéraires, réservations et recommandations",
        showInCard: false,
      },
    ],
  },
];

const PricingComponent: React.FC<PricingComponentProps> = ({
  title,
  subtitle,
  plans,
  onSelectPlan,
  showComparison = false,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<
    "monthly" | "annually" | "annually2"
  >("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<"EUR" | "XPF">("EUR");

  // Taux de conversion EUR vers XPF (1 EUR = 119.33 XPF)
  const exchangeRate = 119.33;

  // Calculer le prix en fonction de la période de facturation et de la devise
  const calculatePrice = (price: number): number => {
    let calculatedPrice = price;

    // Appliquer la réduction selon la période
    if (billingPeriod === "annually") {
      // Réduction de 10% pour la réservation 1 an à l'avance
      calculatedPrice = price * 0.9;
    } else if (billingPeriod === "annually2") {
      // Réduction de 15% pour la réservation 1 an à l&apos;avance et à partir de la deuxième commande
      calculatedPrice = price * 0.85;
    }

    // Convertir en XPF si nécessaire
    if (currency === "XPF") {
      calculatedPrice = calculatedPrice * exchangeRate;
    }

    return calculatedPrice;
  };

  // Basculer entre EUR et XPF
  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "EUR" ? "XPF" : "EUR"));
  };

  // Obtenir le symbole de la devise
  const getCurrencySymbol = () => {
    return currency === "EUR" ? "€" : "XPF";
  };

  // Gérer la sélection d'un plan
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    onSelectPlan(planId);

    // Animation de confirmation
    setTimeout(() => {
      setSelectedPlan(null);
    }, 1000);
  };

  // Afficher le tableau comparatif
  const toggleComparison = () => {
    setIsComparisonOpen(!isComparisonOpen);
  };

  // Créer un objet pour le tooltip (pour les cartes)
  const renderTooltip = (feature: PricingFeature) => {
    const showQuestionMark =
      feature.name === "Carnet de voyage" ||
      feature.name === "Réservation assistée";
    return (
      <div className="flex items-center gap-2">
        <span>{feature.name}</span>
        {showQuestionMark && (
          <button
            className="relative group"
            onClick={(e) => e.preventDefault()}
          >
            <span className="text-primary">?</span>
            <div className="absolute left-0 top-0 w-64 p-2 bg-white text-sm text-gray-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {feature.tooltip}
            </div>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl font-display">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-xl text-secondary max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Bouton de conversion de devise */}
          <div className="mt-6 mb-4">
            <button
              onClick={toggleCurrency}
              className="border border-secondary/20 hover:border-secondary/40 bg-transparent hover:bg-secondary/10 backdrop-blur-sm px-4 py-2 rounded-md text-secondary font-medium transition-all duration-300"
            >
              {currency === "EUR" ? "Afficher en XPF" : "Afficher en EUR"}
            </button>
          </div>

          {/* Sélecteur de période de facturation avec infobulles */}
          <div className="mt-8 flex justify-center flex-wrap gap-2 items-center">
            <div className="relative bg-muted p-1 rounded-full flex flex-wrap">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`relative py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "text-white"
                    : "text-foreground hover:text-primary"
                }`}
                title="Tarif standard sans réduction"
              >
                {billingPeriod === "monthly" && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full z-0"
                    layoutId="billingPeriodTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">Tarif</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setBillingPeriod("annually")}
                  className={`relative py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 group ${
                    billingPeriod === "annually"
                      ? "text-white"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-label="Réduction de 10%"
                >
                  {billingPeriod === "annually" && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full z-0"
                      layoutId="billingPeriodTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">-10%</span>
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => setBillingPeriod("annually2")}
                  className={`relative py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingPeriod === "annually2"
                      ? "text-white"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-label="Réduction de 15%"
                >
                  {billingPeriod === "annually2" && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full z-0"
                      layoutId="billingPeriodTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">-15%</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bouton d'aide avec effet plein écran */}
          <div className="mt-4 flex justify-center">
            <button
              className="border border-secondary/20 hover:border-secondary/40 bg-secondary/10 backdrop-blur-sm px-5 py-2 rounded-md text-secondary/80 hover:text-secondary font-medium flex items-center justify-center mx-auto transition-all duration-300 hover:shadow-md"
              onClick={() => setShowTooltip(true)}
              aria-label="Informations sur les réductions"
            >
              En savoir plus sur les réductions
            </button>
          </div>

          {/* Overlay plein écran pour l'infobulle */}
          <AnimatePresence>
            {showTooltip && (
              <>
                {/* Overlay de flou */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                  onClick={() => setShowTooltip(false)}
                  suppressHydrationWarning={true}
                />

                {/* Contenu de l'infobulle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl"
                  suppressHydrationWarning={true}
                >
                  <div className="bg-primary rounded-2xl p-6 mx-4 sm:p-8 shadow-xl">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Réductions disponibles
                      </h3>
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
                        <span className="text-white text-3xl font-bold">%</span>
                      </div>
                    </div>
                    <div className="space-y-4 text-white">
                      <p className="font-semibold text-xl text-center mb-4">
                        Conditions pour bénéficier des réductions :
                      </p>
                      <div className="bg-white/10 p-4 rounded-xl">
                        <p className="mb-2 flex items-center">
                          <span className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-lg font-bold">
                            -10%
                          </span>
                          <span>Si vous réservez un an à l&apos;avance</span>
                        </p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl">
                        <p className="mb-2 flex items-center">
                          <span className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-lg font-bold">
                            -10%
                          </span>
                          <span>Sur votre deuxième voyage avec Moanava</span>
                        </p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl">
                        <p className="mb-2 flex items-center">
                          <span className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-lg font-bold">
                            -15%
                          </span>
                          <span>
                            Si vous cumulez les deux conditions précédentes
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl transition-colors duration-300"
                      >
                        J&apos;ai compris
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Bouton de comparaison */}
          {showComparison && (
            <div className="mt-6">
              <button
                onClick={toggleComparison}
                className="border border-secondary/20 hover:border-secondary/40 bg-secondary/10 backdrop-blur-sm px-5 py-2 rounded-md text-secondary/80 hover:text-secondary font-medium flex items-center justify-center mx-auto transition-all duration-300 hover:shadow-md"
              >
                <span>
                  {isComparisonOpen ? "Masquer" : "Voir"} les détails inclus
                </span>
                <motion.div
                  animate={{ rotate: isComparisonOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 h-5 w-5 text-secondary"
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
            </div>
          )}
        </div>

        {/* Tableau descriptif */}
        <AnimatePresence>
          {isComparisonOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary mb-4 text-center">
                    Prestations incluses dans toutes les formules
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {commonFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex-shrink-0 w-5 mr-1">
                          <svg
                            className="h-5 w-5 text-secondary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {renderTooltip(feature)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grille des formules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded-2xl overflow-hidden shadow-lg border border-muted"
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-secondary text-primary px-4 py-1 rounded-bl-lg font-medium text-sm">
                  {plan.badge}
                </div>
              )}

              <div className="p-8 bg-card">
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-muted-foreground h-12">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-primary">
                    {getCurrencySymbol() === "€" ? getCurrencySymbol() : ""}
                    {Math.round(calculatePrice(plan.price)).toLocaleString(
                      "fr-FR"
                    )}
                    {getCurrencySymbol() === "XPF"
                      ? " " + getCurrencySymbol()
                      : ""}
                  </span>
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /{plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features
                    .filter((f) => f.showInCard !== false)
                    .map((feature) => (
                      <li
                        key={feature.id}
                        className="flex items-start group relative"
                      >
                        <div
                          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                            feature.included
                              ? "text-secondary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {feature.included ? (
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <p
                            className={`text-base inline-flex items-center ${
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground line-through"
                            }`}
                          >
                            {renderTooltip(feature)}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>

                <div className="mt-8">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    animate={
                      selectedPlan === plan.id ? { scale: [1, 1.05, 1] } : {}
                    }
                  >
                    <ButtonCTA
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                    >
                      {plan.ctaText}
                    </ButtonCTA>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note de bas de page - affichage uniquement du taux de conversion si nécessaire */}
        <div className="text-center mt-12 text-sm text-secondary">
          {currency === "XPF" && (
            <p className="mt-3 italic">
              Taux de conversion utilisé : 1 € = 119,33 XPF
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TarifsPricing() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsContactPopupOpen(true);
  };

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  // Message prérempli en fonction du plan sélectionné
  const getInitialMessage = () => {
    if (!selectedPlan) return "";

    const plan = pricingPlans.find((p) => p.id === selectedPlan);
    if (!plan) return "";

    return `Bonjour Johanna, je souhaite réserver une consultation pour la ${plan.name}. Merci de me contacter pour en discuter.`;
  };

  // Information sur l'origine du formulaire
  const getFormOrigin = () => {
    if (!selectedPlan) return "Formulaire de contact (page Tarifs)";

    const plan = pricingPlans.find((p) => p.id === selectedPlan);
    if (!plan) return "Formulaire de contact (page Tarifs)";

    return `Bouton "Réserver une consultation" - ${plan.name} (page Tarifs)`;
  };

  return (
    <section id="travel-planner" className="min-h-screen py-24 bg-white">
      <PricingComponent
        title={
          <>
            <span className="text-secondary">Tarifs transparents</span>{" "}
            <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
              pour votre voyage sur mesure
            </span>
          </>
        }
        subtitle="Découvrez mes formules claires et sans surprises pour organiser votre voyage de rêve partout dans le monde. Avec mon expertise, gagnez un temps précieux et profitez d'un accompagnement personnalisé du début à la fin."
        plans={pricingPlans}
        onSelectPlan={handleSelectPlan}
        showComparison={true}
      />

      {/* Contact Popup */}
      <ContactFormPopup
        isOpen={isContactPopupOpen}
        onClose={handleCloseContactPopup}
        initialMessage={getInitialMessage()}
        origin={getFormOrigin()}
      />

      {/* Section Sur Devis - page entière */}
      <section
        id="video-creator"
        className="min-h-screen py-20 flex flex-col justify-center"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section sur devis */}
            <div className="p-8">
              <h3 className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl font-display text-center mb-12">
                <span className="text-secondary">Sur</span>{" "}
                <span className="text-primary [text-shadow:_0_1px_0_var(--secondary)]">
                  Devis
                </span>
              </h3>

              <CardHoverEffect
                className="max-w-5xl mx-auto"
                items={[
                  {
                    title: "Groupe > 4 personnes",
                    description:
                      "Je propose des tarifs adaptés aux voyages en groupe, quelle que soit la taille de votre groupe.",
                    icon: Users,
                  },
                  {
                    title: "Voyage > 21 jours",
                    description:
                      "Pour les longs voyages, je vous propose une organisation complète avec un tarif sur mesure.",
                    icon: Plane,
                  },
                  {
                    title: "Multi-destinations",
                    description:
                      "Explorez plusieurs pays ou régions en un seul voyage avec un itinéraire parfaitement coordonné.",
                    icon: Globe,
                  },
                  {
                    title: "Voyage de noce",
                    description:
                      "Des moments inoubliables pour célébrer votre union avec des touches romantiques personnalisées.",
                    icon: Heart,
                  },
                  {
                    title: "Voyage d&apos;affaire",
                    description:
                      "Organisation efficace de vos déplacements professionnels avec un focus sur l&apos;efficacité et le confort.",
                    icon: Briefcase,
                  },
                  {
                    title: "Séminaire",
                    description:
                      "Des solutions complètes pour vos événements d&apos;entreprise, incluant transport, hébergement et activités.",
                    icon: Building,
                  },
                  {
                    title: "Grande randonnée",
                    description:
                      "Parcours de randonnée sur mesure, du grand classique à l&apos;itinérant. Je vous organise des parcours en montagne avec des options de refuge ou bivouac selon vos préférences.",
                    icon: Mountain,
                  },
                  {
                    title: "Autre projet spécifique",
                    description:
                      "Vous avez une idée particulière ? Je suis à votre écoute pour réaliser votre projet sur mesure.",
                    icon: Compass,
                  },
                  {
                    title: "Besoin d&apos;inspiration ?",
                    description:
                      "Vous ne savez pas où aller ? Je peux vous aider à trouver la destination idéale selon vos envies.",
                    icon: MapPin,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
