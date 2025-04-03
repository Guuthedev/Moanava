import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { MouseEffects } from "@/components/ui/mouse-effects";
import { ViewTransitionProvider } from "@/components/ViewTransitionProvider";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
});

// Génération des métadonnées côté serveur
export const metadata: Metadata = {
  title: "Moanava - Voyages sur mesure en Polynésie",
  description:
    "Découvrez la Polynésie française à travers des expériences authentiques et personnalisées. Johanna, votre Travel Planner locale, vous accompagne dans la création de souvenirs inoubliables.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-opensans bg-background text-foreground cursor-none lg:cursor-none sm:cursor-auto md:cursor-auto">
        <ViewTransitionProvider>
          <MouseEffects />
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ViewTransitionProvider>
      </body>
    </html>
  );
}
