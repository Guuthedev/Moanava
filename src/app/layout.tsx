import { ViewTransitionProvider } from "@/components/ViewTransitionProvider";
import { generateHomeMetadata } from "@/lib/metadata";
import "@/styles/view-transitions.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Génération des métadonnées côté serveur
export const metadata: Metadata = generateHomeMetadata({
  title:
    "Voyage sur mesure en Polynésie et dans le monde | Johanna Travel Planner",
  description:
    "Johanna, Travel Planner et créatrice de souvenirs, vous accompagne pour un voyage qui vous ressemble, en Polynésie et dans le monde entier.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={openSans.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background font-sans antialiased"
      >
        <div className="relative overflow-x-hidden w-full">
          <ViewTransitionProvider>{children}</ViewTransitionProvider>
        </div>
      </body>
    </html>
  );
}
