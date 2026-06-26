import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Clock } from "lucide-react";

const services = [
  "Charpente",
  "Couverture",
  "Zinguerie",
  "Bardage",
  "Ossature bois",
  "Fenêtres de toit (Velux)",
  "Terrasse bois",
  "Plancher OSB",
  "Garde-corps",
];

const departments = [
  { num: "70", name: "Haute-Saône" },
  { num: "25", name: "Doubs" },
  { num: "68", name: "Haut-Rhin" },
  { num: "88", name: "Vosges" },
  { num: "90", name: "Territoire de Belfort" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <p className="font-display text-xl font-bold text-white">Bohème Lucas</p>
              <p className="text-xs text-white/50 tracking-widest uppercase mt-0.5">SARL</p>
            </div>
            <div className="text-sm text-white/70 leading-relaxed mb-5 space-y-2">
              <p>Charpente, couverture et zinguerie</p>
              <p>Travaux neufs et rénovation pour les particuliers comme pour les professionnels.</p>
              <p>Notre priorité : un travail de qualité, durable, réalisé dans le respect des règles de l&apos;art.</p>
              <p className="text-accent font-semibold">— Devis gratuit</p>
            </div>
            <a
              href="https://www.facebook.com/p/SARL-boheme-Lucas-100087263357238/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Suivez-nous sur Facebook
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Nos services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Zone d&rsquo;intervention
            </h3>
            <p className="text-sm text-white/70 mb-3">Jusqu&rsquo;à 1h30 de Champagney</p>
            <ul className="space-y-2">
              {departments.map((d) => (
                <li key={d.num} className="flex items-center gap-2 text-sm text-white/60">
                  <span className="bg-accent/20 text-accent text-xs font-bold px-1.5 py-0.5 rounded">
                    {d.num}
                  </span>
                  {d.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-accent mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0751697176"
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>07 51 69 71 76</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:bohemelucas7@gmail.com"
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>bohemelucas7@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Basé à Champagney</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Du lundi au samedi de 8h à 19h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SARL Bohème Lucas — Tous droits réservés</p>
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-end">
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            <span>·</span>
            <Link href="/politique-confidentialite" className="hover:text-white/70 transition-colors">Politique de confidentialité</Link>
            <span>·</span>
            <span>SIRET : 917 779 068 00019</span>
            <span>·</span>
            <a
              href="https://www.agence-dalva.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Site réalisé par l&apos;Agence Web DALVA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
