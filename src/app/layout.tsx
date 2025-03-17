import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moanava - Voyages sur mesure",
  description:
    "Créez des souvenirs inoubliables avec des voyages sur mesure conçus par Johanna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-opensans">{children}</body>
    </html>
  );
}
