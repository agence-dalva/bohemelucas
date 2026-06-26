"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    src: "/slider/toit-full-angle.jpg",
    alt: "Toiture Bohème Lucas — vue d'angle",
  },
  {
    src: "/slider/couverture-11.jpg",
    alt: "Couverture ardoise — réalisation Bohème Lucas",
  },
  {
    src: "/slider/couverture-04.jpg",
    alt: "Couverture après rénovation — Bohème Lucas",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">

      {/* Images en fond — crossfade propre */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/75 via-primary-900/60 to-primary-900/85" />
        </motion.div>
      ))}

      {/* Contenu */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Champagney (70) — Franche-Comté & Alsace
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6"
        >
          Charpentier
          <br />
          <span className="text-accent">couvreur</span>
          <br />
          en Franche-Comté
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl text-white/80 max-w-xl mb-10 leading-relaxed"
        >
          SARL Bohème Lucas — Couverture, charpente, zinguerie, bardage et ossature bois à Champagney (70).
          Artisan qualifié, devis gratuit, intervention dans 5 départements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap gap-4"
        >
          <Button asChild variant="accent" size="xl">
            <Link href="/contact">
              Devis gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline-white" size="xl">
            <Link href="/services">Nos services</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 flex flex-wrap gap-6"
        >
          <a href="tel:0751697176" className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors text-sm">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            07 51 69 71 76
          </a>
          <a href="mailto:bohemelucas7@gmail.com" className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors text-sm">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            bohemelucas7@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
