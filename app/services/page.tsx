"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const services = [
  {
    title: "Couverture",
    image: "/galerie/couverture-05.jpg",
    description:
      "La toiture est la première protection de votre maison contre les intempéries. Nous intervenons sur tous types de couvertures : tuiles mécaniques ou plates, ardoises naturelles ou synthétiques, zinc, bac acier. Neuf, rénovation ou dépannage d'urgence.",
    features: [
      "Pose de toitures neuves",
      "Réfection et rénovation",
      "Entretien et nettoyage",
      "Traitement hydrofuge",
      "Isolation sous toiture",
      "Urgences et dépannages",
    ],
  },
  {
    title: "Charpente",
    image: "/galerie/charpente-02.jpg",
    description:
      "La charpente est l'ossature de votre toit et le garant de sa durabilité. Construction neuve, rénovation ou surélévation : nous réalisons toutes vos charpentes en bois massif (traditionnelles) ou en fermettes industrielles.",
    features: [
      "Charpente traditionnelle",
      "Charpente industrielle (fermettes)",
      "Rénovation et renforcement",
      "Surélévation de toiture",
      "Aménagement des combles",
      "Diagnostic et traitement des bois",
    ],
  },
  {
    title: "Zinguerie",
    image: "/galerie/zinguerie-01.jpg",
    description:
      "La zinguerie assure l'étanchéité des points sensibles de votre toiture. Gouttières, faîtages, noues, solins : nous maîtrisons le zinc, le cuivre et l'aluminium pour des finitions durables et sans fuite.",
    features: [
      "Gouttières et descentes EP",
      "Faîtages et arêtiers",
      "Noues et chéneaux",
      "Solins et bavettes",
      "Habillages et recouvrements",
      "Réparations et fuites",
    ],
  },
  {
    title: "Bardage",
    image: "/galerie/bardage-03.jpg",
    description:
      "Le bardage protège vos façades et pignons tout en améliorant l'isolation thermique de votre bâtiment. Bois, composite ou bac acier : nous sélectionnons la solution adaptée à votre projet et à votre budget.",
    features: [
      "Bardage bois (douglas, mélèze, pin)",
      "Bardage composite",
      "Bardage métallique (bac acier)",
      "Bardage clin",
      "Bardage vertical ou horizontal",
      "Isolation par l'extérieur (ITE)",
    ],
  },
  {
    title: "Ossature bois",
    image: "/galerie/ossature-02.jpg",
    description:
      "L'ossature bois est une solution de construction rapide, légère et écologique. Extensions de maison, garages, annexes, abris de jardin : nous concevons et réalisons vos projets sur mesure en bois.",
    features: [
      "Extensions de maison",
      "Garages et carports",
      "Abris de jardin et chalets",
      "Ossatures pour bardage",
      "Planchers intermédiaires",
      "Construction de combles",
    ],
  },
  {
    title: "Fenêtres de toit (Velux)",
    image: "/galerie/couverture-07.jpg",
    description:
      "Les fenêtres de toit et Velux transforment vos combles en espaces lumineux et habitables. Pose, remplacement ou rénovation : nous intervenons sur toutes les marques (Velux, Fakro, Roto) avec raccordement zinc ou ardoise.",
    features: [
      "Pose de fenêtres de toit",
      "Remplacement et rénovation",
      "Fenêtres à rotation et projection",
      "Verrières et lanterneaux",
      "Volets et stores intégrés",
      "Raccordement zinc ou ardoise",
    ],
  },
  {
    title: "Terrasse bois",
    image: "https://images.unsplash.com/photo-1481253127861-534498168948?w=700&q=80",
    description:
      "Une terrasse en bois prolonge agréablement votre espace de vie extérieur. Nous réalisons des terrasses sur mesure en bois naturel (pin, ipé, douglas) ou composite, sur plots ou lambourdes, pour particuliers et professionnels.",
    features: [
      "Terrasse en bois naturel (pin, ipé, douglas)",
      "Terrasse composite (entretien minimal)",
      "Terrasse sur plots ou lambourdes",
      "Terrasse sur toiture-terrasse",
      "Intégration de mobilier",
      "Traitement et finition",
    ],
  },
  {
    title: "Garde-corps",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",
    description:
      "Sécurité et esthétique vont de pair avec nos garde-corps sur mesure. Bois, acier ou mixte : nous fabriquons et posons des garde-corps conformes aux normes NF P01-012 pour balcons, terrasses, mezzanines et escaliers.",
    features: [
      "Garde-corps bois",
      "Garde-corps métal (acier, aluminium)",
      "Garde-corps mixte bois/métal",
      "Rampes d'escalier",
      "Conformes aux normes NF P01-012",
      "Pose sur terrasse, balcon, toiture",
    ],
  },
  {
    title: "Plancher OSB",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    description:
      "Le plancher OSB est une solution économique, solide et rapide à poser pour les combles, mezzanines et planchers intermédiaires. Posé sur vos solives ou fermettes existantes, il supporte les usages courants.",
    features: [
      "Plancher OSB 3 ou OSB 4",
      "Pose sur solives ou fermettes",
      "Aménagement de combles perdus",
      "Mezzanines et planchers intermédiaires",
      "Isolation acoustique",
      "Finition au choix",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Prise de contact",
    description: "Vous nous appelez ou remplissez notre formulaire. Nous répondons rapidement.",
  },
  {
    step: "02",
    title: "Visite et devis",
    description: "Nous venons sur place évaluer vos besoins et vous remettons un devis gratuit et détaillé.",
  },
  {
    step: "03",
    title: "Réalisation",
    description: "Nos artisans interviennent dans les délais convenus, avec soin et professionnalisme.",
  },
  {
    step: "04",
    title: "Livraison",
    description: "Nous faisons le point avec vous à la fin du chantier pour votre satisfaction totale.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Nos prestations"
        subtitle="Couverture, charpente, zinguerie, bardage, ossature bois — artisan qualifié à Champagney (70), devis gratuit dans 5 départements."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        bgImage="/galerie/charpente-03.jpg"
      />

      {/* Services list */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="space-y-16">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={0.05}>
                <div
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-text-muted leading-relaxed mb-6 text-base sm:text-lg">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-primary-800">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="default" size="default">
                      <Link href="/contact">
                        Demander un devis
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-primary-700">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Notre méthode</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
              Comment ça se passe ?
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-xl font-bold text-accent">{p.step}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{p.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface text-center">
        <div className="container-max max-w-2xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-primary-800 mb-4">
              Un projet de toiture ou de charpente ?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Demandez un devis gratuit à votre artisan couvreur-charpentier de Champagney. Réponse rapide, intervention dans tout le Doubs, la Haute-Saône et les départements voisins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="accent" size="xl">
                <Link href="/contact">
                  Devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
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
