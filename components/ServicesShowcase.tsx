"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SiteButton from "@/components/SiteButton";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  { title: "Couverture",      tag: "Toiture",       image: "/galerie/couverture-05.jpg" },
  { title: "Charpente",       tag: "Structure bois", image: "/galerie/charpente-02.jpg" },
  { title: "Zinguerie",       tag: "Étanchéité",    image: "/galerie/zinguerie-02.jpg" },
  { title: "Bardage",         tag: "Façade",         image: "/galerie/bardage-03.jpg" },
  { title: "Ossature bois",   tag: "Construction",   image: "/galerie/ossature-02.jpg" },
  { title: "Fenêtres de toit", tag: "Luminosité",   image: "/galerie/couverture-12.jpg" },
  { title: "Terrasse bois",   tag: "Extérieur",      image: "/galerie/bardage-05.jpg" },
  { title: "Garde-corps",     tag: "Sécurité",       image: "/galerie/ossature-04.jpg" },
  { title: "Plancher OSB",    tag: "Aménagement",    image: "/galerie/charpente-04.jpg" },
];

// Quadruple la liste pour éviter le jump visible
const track = [...services, ...services, ...services, ...services];

export default function ServicesShowcase() {
  return (
    <section className="py-20 bg-background overflow-hidden">

      {/* Header */}
      <div className="container-max px-5 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <AnimatedSection direction="right">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-800 leading-tight">
              Nos services
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <SiteButton asChild variant="default">
              <Link href="/services">
                Voir toutes nos prestations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SiteButton>
          </AnimatedSection>
        </div>
      </div>

      {/* Bande : marges sur mobile, plein écran sur desktop */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-4 pl-5 sm:pl-0"
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {track.map((s, i) => (
            <div
              key={`${s.title}-${i}`}
              className="flex-shrink-0 relative overflow-hidden rounded-2xl"
              style={{ width: 280, height: 380 }}
            >
              {/* Photo */}
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="280px"
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Titre */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display font-bold text-white text-base leading-tight">
                  {s.title}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
