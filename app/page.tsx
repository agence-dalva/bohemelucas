"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteButton from "@/components/SiteButton";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ServicesShowcase from "@/components/ServicesShowcase";
import HeroSlider from "@/components/HeroSlider";
import MapZone from "@/components/MapZone";

const stats = [
  { value: "2022", label: "Année de création" },
  { value: "5", label: "Départements couverts" },
  { value: "Zone d'action", label: "25 · 68 · 70 · 88 · 90" },
  { value: "100%", label: "Artisan qualifié" },
];

const departments = [
  { num: "70", name: "Haute-Saône" },
  { num: "25", name: "Doubs" },
  { num: "68", name: "Haut-Rhin" },
  { num: "88", name: "Vosges" },
  { num: "90", name: "Territoire de Belfort" },
];

const reviews = [
  {
    author: "Maçonnerie 70",
    role: "Professionnel du bâtiment",
    text: "Nous avons eu l'occasion de réaliser plusieurs chantiers en collaboration avec l'entreprise Bohème Lucas. Le travail a toujours été soigné, sérieux et parfaitement à la hauteur de nos attentes.",
    rating: 5,
  },
  {
    author: "Stéphane J.",
    role: "Client",
    text: "Nous sommes très satisfaits du travail effectué par Bohème Lucas. Travail soigné, délais respectés et équipe agréable du début à la fin.",
    rating: 5,
  },
  {
    author: "Valentin L.",
    role: "Client",
    text: "Entreprise vraiment sérieuse ! Je recommande vivement.",
    rating: 5,
  },
];

const whyUs = [
  "Devis gratuit et sans engagement",
  "Artisan local et réactif",
  "Travail soigné et durable",
  "Respect des délais",
  "Conseils personnalisés",
  "Assurance décennale",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSlider />

      {/* ── STATS BAR ── */}
      <section className="bg-surface py-8">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-border">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08} className="text-center py-3 lg:py-0">
                <p className="font-display text-3xl font-bold text-accent">{s.value}</p>
                <p className="text-sm text-text-muted mt-0.5">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section-padding bg-surface">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl max-w-sm mx-auto lg:max-w-none">
                  <Image
                    src="/accueil/boheme-lucas.jpg"
                    alt="Lucas Bohème — artisan charpentier couvreur à Champagney"
                    fill
                    sizes="(max-width: 1024px) 80vw, 45vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-accent rounded-xl p-5 shadow-lg hidden sm:block">
                  <p className="text-white text-3xl font-display font-bold">2022</p>
                  <p className="text-white/80 text-xs mt-0.5">Création de l&apos;entreprise</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">Pourquoi nous choisir</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-800 mt-2 mb-6 leading-tight">
                Un artisan de confiance,<br />des chantiers bien faits
              </h2>
              <p className="text-text-muted leading-relaxed mb-4 text-base sm:text-lg">
                Fondée en 2022 à Champagney (Haute-Saône), notre entreprise intervient sur tous vos projets
                de toiture et de construction bois. Nous travaillons aussi bien pour des particuliers que des professionnels,
                dans 5 départements.
              </p>
              <p className="text-text-muted leading-relaxed mb-8 text-base sm:text-lg">
                Ce qui fait la différence ? Un devis clair et détaillé remis après visite, des délais tenus,
                un chantier propre et une garantie décennale sur nos travaux. Pas de mauvaises surprises.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-primary-800">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <SiteButton asChild variant="default">
                  <Link href="/contact">
                    Nous contacter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </SiteButton>
                <SiteButton asChild variant="outline">
                  <Link href="/galerie">Voir nos réalisations</Link>
                </SiteButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── ZONE D'INTERVENTION ── */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Contenu */}
            <AnimatedSection direction="right">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">Zone d&rsquo;intervention</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-800 mt-3 mb-4 leading-tight">
                Basés à Champagney,<br />actifs partout en<br />Franche-Comté
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-8 max-w-sm">
                Nous intervenons dans un rayon de 100 km — Haute-Saône, Doubs, Territoire de Belfort, Haut-Rhin et Vosges.
              </p>

              <div className="grid grid-cols-1 gap-0 mb-10">
                {departments.map((d, i) => (
                  <motion.div
                    key={d.num}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                  >
                    <span className="font-display font-bold text-accent text-lg w-8 shrink-0">{d.num}</span>
                    <span className="text-primary-800 text-sm font-medium">{d.name}</span>
                  </motion.div>
                ))}
              </div>

              <SiteButton asChild variant="default">
                <a href="tel:0751697176">
                  <Phone className="w-4 h-4" />
                  Appelez-nous — 07 51 69 71 76
                </a>
              </SiteButton>
            </AnimatedSection>

            {/* Carte */}
            <AnimatedSection direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: "min(420px, 60vw)", isolation: "isolate", zIndex: 0 }}>
                <MapZone />
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <ServicesShowcase />

      {/* ── AVANT / APRÈS ── */}
      <section className="section-padding bg-surface">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Résultat concret</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-800 mt-2 mb-4">
              Avant / Après
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-base sm:text-lg">
              Glissez le curseur pour comparer avant et après notre intervention.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection direction="right">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Couverture</p>
              <BeforeAfterSlider
                before={{ src: "/galerie/couverture-07.jpg", alt: "Toiture avant rénovation" }}
                after={{ src: "/galerie/couverture-04.jpg", alt: "Toiture après rénovation" }}
              />
            </AnimatedSection>
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Bardage</p>
              <BeforeAfterSlider
                before={{ src: "/galerie/bardage-06.jpg", alt: "Bardage avant rénovation" }}
                after={{ src: "/galerie/bardage-05.jpg", alt: "Bardage après rénovation" }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── AVIS CLIENTS ── */}
      <section className="section-padding bg-primary-700">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Avis clients</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
              Ce que disent nos clients
            </h2>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-white/70 text-sm ml-2">5/5 sur Google</span>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <StaggerItem key={review.author}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 h-full"
                >
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {review.author[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-800">{review.author}</p>
                      <p className="text-xs text-text-muted">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="mt-8 text-center">
            <a
              href="https://www.facebook.com/p/SARL-boheme-Lucas-100087263357238/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              Voir tous les avis sur Google
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="section-padding bg-surface">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Nos réalisations</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-800 mt-2 mb-4">
              Chantiers récents
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-base">
              Couverture, charpente, bardage, ossature bois — quelques exemples de nos réalisations en Franche-Comté et en Alsace.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { src: "/galerie/couverture-01.jpg", alt: "Couverture toiture" },
              { src: "/galerie/bardage-01.jpg", alt: "Bardage façade" },
              { src: "/galerie/charpente-01.jpg", alt: "Charpente bois" },
              { src: "/galerie/ossature-01.jpg", alt: "Ossature bois" },
              { src: "/galerie/zinguerie-01.jpg", alt: "Zinguerie" },
              { src: "/galerie/couverture-05.jpg", alt: "Couverture ardoise" },
            ].map((img, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`relative overflow-hidden rounded-xl ${i === 0 ? "row-span-2" : ""} aspect-[4/3]`}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-primary-900/0 hover:bg-primary-900/20 transition-colors duration-200" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="mt-8 text-center">
            <SiteButton asChild variant="default">
              <Link href="/galerie">
                Voir la galerie complète
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SiteButton>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/galerie/couverture-20.jpg"
            alt="Toiture"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/95" />
        </div>

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Un projet de toiture<br />ou de charpente ?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Contactez votre artisan couvreur-charpentier à Champagney pour un devis gratuit et sans engagement. Réponse sous 24h.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="xl">
                <Link href="/contact">
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline-white"
                size="xl"
              >
                <a href="tel:0751697176">
                  <Phone className="w-5 h-5" />
                  07 51 69 71 76
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
