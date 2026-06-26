import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charpentier Couvreur Champagney (70) — SARL Bohème Lucas",
  description:
    "Artisan charpentier-couvreur-zingueur à Champagney (Haute-Saône). Couverture, charpente, bardage, ossature bois, Velux, terrasse bois, garde-corps. Devis gratuit — 07 51 69 71 76. Départements 25, 68, 70, 88, 90.",
  keywords:
    "charpentier couvreur Champagney, charpente Haute-Saône, couverture toiture 70, zinguerie Franche-Comté, bardage bois, ossature bois, Velux pose, terrasse bois, garde-corps, devis charpente gratuit, artisan couvreur Belfort, charpentier Doubs, couvreur Haut-Rhin",
  openGraph: {
    title: "SARL Bohème Lucas — Charpentier Couvreur à Champagney (70)",
    description:
      "Artisan charpentier-couvreur-zingueur basé à Champagney. Couverture, charpente, bardage, ossature bois, Velux. Devis gratuit et sans engagement.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${raleway.variable}`}>
      <body className="font-sans antialiased bg-background">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
