import { baseUrl } from "@/lib/constants";
import { Metadata } from "next";

// Fonction pour générer les métadonnées (côté serveur)
export function generateHomeMetadata({
  title = "Moanava - Voyages sur mesure en Polynésie et dans le monde avec Johanna",
  description = "Découvrez les services de Johanna, Travel Planner passionnée, pour des voyages authentiques et personnalisés en Polynésie française et dans le monde entier.",
  keywords = [
    "travel planner polynésie",
    "voyage sur mesure tahiti",
    "voyages personnalisés",
    "johanna travel planner",
    "voyage authentique polynésie",
    "organisateur voyage personnalisé",
    "séjour polynésie française",
    "itinéraire sur mesure bora bora",
    "voyage de luxe polynésie",
    "conseiller voyage tahiti",
  ],
  imageUrl = `${baseUrl}/images/johanna/johannarbre.webp`,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Johanna, Travel Planner pour vos voyages sur mesure en Polynésie",
        },
      ],
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}
