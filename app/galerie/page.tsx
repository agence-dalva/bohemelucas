"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";

type Category =
  | "Tous"
  | "Couverture"
  | "Charpente"
  | "Bardage"
  | "Ossature bois"
  | "Zinguerie";

interface Photo {
  src: string;
  alt: string;
  category: Exclude<Category, "Tous">;
}

const photos: Photo[] = [
  { src: "/galerie/couverture-01.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-02.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-03.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-04.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-05.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-06.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-07.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-08.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-09.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-10.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-11.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-12.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-13.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-14.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-15.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-16.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-17.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-18.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-19.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-20.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-21.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-22.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-23.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-24.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-25.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-26.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-27.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-28.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-29.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-30.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-31.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-32.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-33.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-34.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-35.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/couverture-37.jpg", alt: "Couverture toiture", category: "Couverture" },
  { src: "/galerie/bardage-01.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-02.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-03.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-04.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-05.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-06.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-07.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-08.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-09.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-10.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-11.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-12.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/bardage-13.jpg",    alt: "Bardage façade",    category: "Bardage" },
  { src: "/galerie/charpente-01.jpg",  alt: "Charpente bois",    category: "Charpente" },
  { src: "/galerie/charpente-02.jpg",  alt: "Charpente bois",    category: "Charpente" },
  { src: "/galerie/charpente-03.jpg",  alt: "Charpente bois",    category: "Charpente" },
  { src: "/galerie/charpente-04.jpg",  alt: "Charpente bois",    category: "Charpente" },
  { src: "/galerie/charpente-05.jpg",  alt: "Charpente bois",    category: "Charpente" },
  { src: "/galerie/ossature-01.jpg",   alt: "Ossature bois",     category: "Ossature bois" },
  { src: "/galerie/ossature-02.jpg",   alt: "Ossature bois",     category: "Ossature bois" },
  { src: "/galerie/ossature-03.jpg",   alt: "Ossature bois",     category: "Ossature bois" },
  { src: "/galerie/ossature-04.jpg",   alt: "Ossature bois",     category: "Ossature bois" },
  { src: "/galerie/ossature-05.jpg",   alt: "Ossature bois",     category: "Ossature bois" },
  { src: "/galerie/ossature-06.jpg",   alt: "Ossature bois",     category: "Ossature bois" },
  { src: "/galerie/zinguerie-01.jpg",  alt: "Zinguerie",         category: "Zinguerie" },
  { src: "/galerie/zinguerie-02.jpg",  alt: "Zinguerie",         category: "Zinguerie" },
];

const categories: Category[] = [
  "Tous",
  "Couverture",
  "Bardage",
  "Charpente",
  "Ossature bois",
  "Zinguerie",
];

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === "Tous"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <>
      <PageHero
        title="Galerie"
        subtitle={`${photos.length} photos de nos réalisations en Franche-Comté et Alsace.`}
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Galerie" }]}
        bgImage="/galerie/couverture-01.jpg"
      />

      <section className="section-padding bg-background">
        <div className="container-max">

          {/* Filtres */}
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => {
                const count =
                  cat === "Tous"
                    ? photos.length
                    : photos.filter((p) => p.category === cat).length;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-primary-700 text-white shadow-md"
                        : "bg-surface text-primary-700 hover:bg-primary-50 border border-border"
                    }`}
                  >
                    {cat}
                    <span
                      className={`ml-2 text-xs ${
                        activeCategory === cat ? "text-white/60" : "text-text-muted"
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Grille */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {filtered.map((photo, i) => (
                <button
                  key={photo.src}
                  onClick={() => setLightbox(i)}
                  className="relative aspect-square overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 bg-surface"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading={i < 8 ? "eager" : "lazy"}
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-2 shadow-md transition-opacity duration-200">
                      <ZoomIn className="w-4 h-4 text-primary-700" />
                    </div>
                  </div>
                  {/* Badge catégorie */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-medium">{photo.category}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Fermer */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Précédent */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl"
              style={{ height: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Suivant */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
              aria-label="Suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Légende */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/50 text-xs">
                {lightbox + 1} / {filtered.length} — {filtered[lightbox].category}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
