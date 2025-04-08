"use client";

import TravelPlannerAdvantages from "@/components/TravelPlannerAdvantages";
import TravelPlannerCTA from "@/components/TravelPlannerCTA";
import TravelPlannerHero from "@/components/TravelPlannerHero";
import TravelPlannerProcess from "@/components/TravelPlannerProcess";

// Définition des étapes du processus de voyage
const travelSteps = [
  {
    id: 1,
    title: "Consultation découverte gratuite",
    description:
      "Prenez rendez-vous pour une première rencontre en visioconférence où nous échangerons sur vos rêves de voyage en Polynésie ou ailleurs. Nous discuterons de vos envies, budget, dates et attentes spécifiques. Cette consultation découverte est entièrement gratuite et sans engagement.",
  },
  {
    id: 2,
    title: "Proposition et devis personnalisé",
    description:
      "Sous 24h, je vous envoie un devis détaillé et sur mesure (valable 72h) pour votre voyage personnalisé. Après validation et paiement, vous recevez votre facture et je commence immédiatement la création de votre itinéraire de voyage unique et adapté à vos souhaits.",
  },
  {
    id: 3,
    title: "Élaboration de votre itinéraire",
    description:
      "Dans les 15 jours suivants, je vous présente les grandes lignes de votre voyage avec toutes les propositions de transports, activités authentiques, et hébergements de qualité. Vous pourrez alors suggérer des modifications pour que votre itinéraire soit parfaitement adapté à vos envies de découverte.",
  },
  {
    id: 4,
    title: "Réservation des prestations",
    description:
      "Une fois votre programme de voyage validé, vous procédez aux réservations grâce aux liens et contacts fournis dans votre itinéraire. Pour garantir les disponibilités, il est fortement recommandé de finaliser vos réservations dans les 48 heures suivant la validation du programme.",
  },
  {
    id: 5,
    title: "Création de votre carnet de voyage",
    description:
      "Après confirmation de vos réservations, je conçois votre carnet de voyage complet et détaillé qui inclut votre itinéraire jour par jour, des recommandations locales, des conseils pratiques et toutes les informations essentielles. Vous recevrez ce document précieux au format numérique dans les 15 jours suivants.",
  },
  {
    id: 6,
    title: "Assistance pendant votre séjour",
    description:
      "Tout au long de votre aventure, je reste joignable via WhatsApp pour répondre à vos questions et vous assister en cas d'imprévu. Mon objectif est que vous profitiez pleinement de chaque moment de votre voyage. À votre retour, je vous enverrai une courte enquête de satisfaction pour recueillir vos impressions.",
  },
];

export default function TravelPlannerPage() {
  // Fonction pour gérer le clic sur le bouton de contact
  const handleContactClick = () => {
    // Ici vous pouvez ajouter la logique pour le formulaire de contact
    console.log("Contact button clicked");
  };

  return (
    <main className="flex flex-col">
      <TravelPlannerHero />
      <TravelPlannerAdvantages />
      <TravelPlannerProcess steps={travelSteps} />
      <TravelPlannerCTA onContactClick={handleContactClick} />
    </main>
  );
}
