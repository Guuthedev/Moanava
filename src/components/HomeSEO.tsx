"use client";

import { baseUrl } from "@/lib/constants";

// Composant HomeSEO qui inclut les balisages schema.org
export default function HomeSEO() {
  // Données pour le schéma LocalBusiness
  const companySchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Moanava",
    description:
      "Service de conception de voyages sur mesure en Polynésie française et dans le monde entier",
    image: `${baseUrl}/images/logo/logo-big-moanava.webp`,
    url: baseUrl,
    telephone: "+33600000000", // À remplacer par le numéro réel
    address: {
      "@type": "PostalAddress",
      addressCountry: "PF",
      addressLocality: "Papeete", // À adapter selon la localisation réelle
    },
    priceRange: "€€",
    openingHours: "Mo-Fr 09:00-19:00",
    sameAs: [
      "https://www.instagram.com/moanava/", // À adapter selon les réseaux sociaux réels
      "https://www.facebook.com/moanava/", // À adapter selon les réseaux sociaux réels
    ],
  };

  // Données pour le schéma Person (Johanna)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Johanna",
    jobTitle: "Travel Planner",
    description:
      "Travel Planner spécialisée dans les voyages sur mesure en Polynésie française et dans le monde entier",
    image: `${baseUrl}/images/johanna/johannarbre.webp`,
    url: `${baseUrl}/a-propos`,
    worksFor: {
      "@type": "Organization",
      name: "Moanava",
    },
  };

  // Données pour le schéma Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Conception de voyages sur mesure",
    provider: {
      "@type": "LocalBusiness",
      name: "Moanava",
    },
    serviceType: "Roadtrip Planner",
    description:
      "Service personnalisé de conception d'itinéraires de voyage sur mesure en Polynésie française et dans le monde entier",
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
  };

  // JSON-LD pour les moteurs de recherche
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
