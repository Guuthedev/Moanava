import ServerBody from "@/components/ServerBody";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

// Génération des métadonnées côté serveur
export const metadata: Metadata = {
  title: "Moanava - Créateur de Souvenirs",
  description:
    "Voyagez serein en Polynésie avec Moanava. Je crée votre itinéraire sur mesure, adapté à vos envies et à votre rythme. Expert local, conseils personnalisés et support pendant votre séjour.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={openSans.className}>
      <ServerBody>{children}</ServerBody>
    </html>
  );
}
