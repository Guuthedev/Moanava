import { ViewTransitionProvider } from "@/components/ViewTransitionProvider";
import { generateHomeMetadata } from "@/lib/metadata";
import "@/styles/view-transitions.css";
import type { Metadata } from "next";
import "./globals.css";

// Génération des métadonnées côté serveur
export const metadata: Metadata = generateHomeMetadata({
  title: "Moanava - Voyages sur mesure avec Johanna, votre Travel Planner",
  description:
    "Créez des souvenirs inoubliables avec des voyages personnalisés en Polynésie et dans le monde entier, conçus par Johanna, votre Travel Planner passionnée.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
      </head>
      <body className="font-opensans overflow-x-hidden max-w-[100vw]">
        <div className="relative overflow-x-hidden w-full">
          <ViewTransitionProvider>{children}</ViewTransitionProvider>
        </div>
      </body>
    </html>
  );
}
