import TarifsCTA from "@/components/TarifsCTA";
import TarifsFAQ from "@/components/TarifsFAQ";
import TarifsHero from "@/components/TarifsHero";
import TarifsPricing from "@/components/TarifsPricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs | Moanava Voyages",
  description:
    "Découvrez nos formules et tarifs pour l'organisation de votre voyage personnalisé en Polynésie française et dans le monde entier.",
  openGraph: {
    title: "Tarifs | Moanava Voyages",
    description:
      "Découvrez nos formules et tarifs pour l'organisation de votre voyage personnalisé en Polynésie française et dans le monde entier.",
    url: "https://www.moanava.com/tarifs",
    siteName: "Moanava Voyages",
    images: [
      {
        url: "/images/destinations/Hero.webp",
        width: 1200,
        height: 630,
        alt: "Moanava Voyages - Tarifs",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function TarifsPage() {
  return (
    <main className="min-h-screen">
      <TarifsHero />

      <TarifsPricing />

      <TarifsFAQ />

      <TarifsCTA />
    </main>
  );
}
