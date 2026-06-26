"use client";
import { useState, useRef, useEffect, useId } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, ChevronDown, Search } from "lucide-react";
import SiteButton from "@/components/SiteButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";

const MapZone = dynamic(() => import("@/components/MapZone"), { ssr: false });

// Email providers valides uniquement
const VALID_EMAIL_DOMAINS = [
  "gmail.com", "googlemail.com",
  "outlook.com", "outlook.fr", "hotmail.com", "hotmail.fr", "live.com", "live.fr", "msn.com",
  "yahoo.com", "yahoo.fr",
  "icloud.com", "me.com", "mac.com",
  "orange.fr", "wanadoo.fr", "laposte.net", "free.fr", "sfr.fr", "bouyguestelecom.fr",
  "protonmail.com", "proton.me", "pm.me",
  "bbox.fr", "numericable.fr", "neuf.fr", "cegetel.net",
];

const schema = z.object({
  nom: z.string().min(2, "Veuillez entrer votre nom"),
  prenom: z.string().min(2, "Veuillez entrer votre prénom"),
  email: z
    .string()
    .email("Adresse email invalide")
    .refine((val) => {
      const domain = val.split("@")[1]?.toLowerCase();
      if (!domain) return false;
      // Accepte aussi les domaines entreprise (au moins un point dans le domaine)
      if (VALID_EMAIL_DOMAINS.includes(domain)) return true;
      // Domaine custom (entreprise, mairie, etc.) : on accepte si format valide
      return domain.includes(".") && domain.length > 3;
    }, "Veuillez utiliser une adresse email valide (Gmail, Outlook, Yahoo, etc.)"),
  telephone: z
    .string()
    .min(1, "Numéro de téléphone requis")
    .refine((val) => {
      const digits = val.replace(/\s/g, "");
      return /^(\+33|0)[1-9]\d{8}$/.test(digits);
    }, "Numéro de téléphone invalide (ex : 06 12 34 56 78)"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  ville: z.string().min(2, "Veuillez entrer votre commune"),
  message: z.string().min(20, "Votre message doit contenir au moins 20 caractères"),
  // honeypot — doit rester vide
  _hp: z.string().max(0, "").optional(),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Couverture",
  "Charpente",
  "Zinguerie",
  "Bardage",
  "Ossature bois",
  "Fenêtres de toit (Velux)",
  "Terrasse bois",
  "Plancher OSB",
  "Garde-corps",
  "Autre / Plusieurs services",
];

const communes = [
  // Haute-Saône (70)
  "Champagney (70)", "Ronchamp (70)", "Luxeuil-les-Bains (70)", "Lure (70)", "Vesoul (70)",
  "Gray (70)", "Héricourt (70)", "Jussey (70)", "Faverney (70)", "Port-sur-Saône (70)",
  // Territoire de Belfort (90)
  "Belfort (90)", "Delle (90)", "Giromagny (90)", "Valdoie (90)", "Bavilliers (90)",
  "Beaucourt (90)", "Bourogne (90)", "Châtenois-les-Forges (90)", "Danjoutin (90)",
  "Essert (90)", "Fontaine (90)", "Meroux-Moval (90)", "Offemont (90)", "Rougemont-le-Château (90)",
  // Doubs (25)
  "Besançon (25)", "Montbéliard (25)", "Pontarlier (25)", "Audincourt (25)", "Valentigney (25)",
  "Baume-les-Dames (25)", "Maîche (25)", "Morteau (25)", "Sochaux (25)", "Hérimoncourt (25)",
  "Grand-Charmont (25)", "Étupes (25)", "Seloncourt (25)", "Bart (25)", "Blamont (25)",
  // Haut-Rhin (68)
  "Mulhouse (68)", "Colmar (68)", "Saint-Louis (68)", "Guebwiller (68)", "Thann (68)",
  "Cernay (68)", "Illzach (68)", "Huningue (68)", "Altkirch (68)", "Masevaux (68)",
  "Sierentz (68)", "Wittenheim (68)", "Kingersheim (68)", "Wittelsheim (68)",
  // Vosges (88)
  "Épinal (88)", "Saint-Dié-des-Vosges (88)", "Remiremont (88)", "Gérardmer (88)",
  "Thaon-les-Vosges (88)", "Vittel (88)", "Contrexéville (88)", "Neufchâteau (88)",
  "La Bresse (88)", "Xertigny (88)",
  // Autre
  "Autre commune",
];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

// Combobox autocomplete pour les communes
function CommuneCombobox({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.length >= 2
    ? communes.filter((c) =>
        c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
          .includes(query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))
      ).slice(0, 8)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={query}
          autoComplete="off"
          placeholder="Tapez votre commune..."
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open && filtered.length > 0}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!communes.includes(e.target.value)) onChange("");
          }}
          onFocus={() => setOpen(true)}
          className={`flex h-11 w-full rounded-lg border bg-white pl-9 pr-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent hover:border-primary-300 ${
            error ? "border-red-400" : "border-border"
          }`}
        />
      </div>

      {open && filtered.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-52 overflow-y-auto"
        >
          {filtered.map((c) => (
            <li
              key={c}
              role="option"
              aria-selected={value === c}
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery(c);
                onChange(c);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                value === c
                  ? "bg-primary-50 text-primary-800 font-medium"
                  : "text-primary-800 hover:bg-surface"
              }`}
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const contactItems = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "07 51 69 71 76",
    href: "tel:0751697176",
  },
  {
    icon: Mail,
    label: "Email",
    value: "bohemelucas7@gmail.com",
    href: "mailto:bohemelucas7@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Basé à Champagney, Haute-Saône (70)",
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Du lundi au samedi de 8h à 19h",
    href: null,
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const villeValue = watch("ville") ?? "";

  const onSubmit = async (data: FormData) => {
    // Honeypot check côté client
    if (data._hp && data._hp.length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
      <PageHero
        title="Devis gratuit — Charpente & Couverture"
        subtitle="Obtenez un devis gratuit auprès de votre artisan couvreur-charpentier à Champagney (70). Réponse sous 24h."
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        bgImage="/galerie/bardage-05.jpg"
      />

      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection direction="right">
                <h2 className="font-display text-2xl font-bold text-primary-800 mb-6">
                  Coordonnées
                </h2>
                <div className="space-y-4">
                  {contactItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary-200 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-primary-800 hover:text-accent transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-primary-800">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-primary-800 mb-2">
                    Demande de devis gratuit
                  </h2>
                  <p className="text-text-muted text-sm mb-7">
                    Remplissez ce formulaire et nous vous recontactons sous 24h.
                  </p>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        className="flex flex-col items-center text-center py-12"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-primary-800 mb-2">
                          Message envoyé !
                        </h3>
                        <p className="text-text-muted text-sm max-w-xs">
                          Merci pour votre demande. Nous vous recontacterons dans les plus brefs délais.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        {/* Honeypot — caché visuellement et pour les lecteurs d'écran */}
                        <div aria-hidden="true" className="absolute -top-[9999px] -left-[9999px] opacity-0 pointer-events-none" tabIndex={-1}>
                          <label htmlFor="_hp">Ne pas remplir</label>
                          <input
                            id="_hp"
                            type="text"
                            autoComplete="off"
                            tabIndex={-1}
                            {...register("_hp")}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="nom">Nom *</Label>
                            <Input
                              id="nom"
                              placeholder="Dupont"
                              {...register("nom")}
                              className={errors.nom ? "border-red-400 focus:ring-red-400" : ""}
                            />
                            {errors.nom && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.nom.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="prenom">Prénom *</Label>
                            <Input
                              id="prenom"
                              placeholder="Jean"
                              {...register("prenom")}
                              className={errors.prenom ? "border-red-400 focus:ring-red-400" : ""}
                            />
                            {errors.prenom && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.prenom.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="jean.dupont@gmail.com"
                              {...register("email")}
                              className={errors.email ? "border-red-400 focus:ring-red-400" : ""}
                            />
                            {errors.email && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="telephone">Téléphone *</Label>
                            <Input
                              id="telephone"
                              type="tel"
                              placeholder="06 12 34 56 78"
                              maxLength={14}
                              {...register("telephone")}
                              onChange={(e) => {
                                const formatted = formatPhone(e.target.value);
                                setValue("telephone", formatted, { shouldValidate: true });
                              }}
                              className={errors.telephone ? "border-red-400 focus:ring-red-400" : ""}
                            />
                            {errors.telephone && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.telephone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Dropdown service avec flèche custom */}
                          <div className="space-y-1.5">
                            <Label htmlFor="service">Service souhaité *</Label>
                            <div className="relative">
                              <select
                                id="service"
                                {...register("service")}
                                className={`appearance-none flex h-11 w-full rounded-lg border bg-white pl-4 pr-10 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent hover:border-primary-300 ${
                                  errors.service ? "border-red-400" : "border-border"
                                }`}
                              >
                                <option value="">Sélectionner...</option>
                                {services.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            </div>
                            {errors.service && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.service.message}
                              </p>
                            )}
                          </div>

                          {/* Autocomplete commune */}
                          <div className="space-y-1.5">
                            <Label htmlFor="ville">Commune *</Label>
                            <input type="hidden" {...register("ville")} />
                            <CommuneCombobox
                              value={villeValue}
                              onChange={(val) => setValue("ville", val, { shouldValidate: true })}
                              error={errors.ville?.message}
                            />
                            {errors.ville && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.ville.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="message">Décrivez votre projet *</Label>
                          <Textarea
                            id="message"
                            rows={5}
                            placeholder="Décrivez votre projet en quelques mots : surface, type de travaux, délais souhaités..."
                            {...register("message")}
                            className={errors.message ? "border-red-400 focus:ring-red-400" : ""}
                          />
                          {errors.message && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.message.message}
                            </p>
                          )}
                        </div>

                        {status === "error" && (
                          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            Une erreur s&rsquo;est produite. Veuillez réessayer ou nous appeler directement.
                          </div>
                        )}

                        <SiteButton
                          type="submit"
                          variant="accent"
                          className="w-full"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Envoyer ma demande
                            </>
                          )}
                        </SiteButton>

                        <p className="text-xs text-text-muted text-center">
                          * Champs obligatoires. Devis 100% gratuit et sans engagement.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention — carte interactive */}
      <ZoneInterventionMap />
    </>
  );
}

function ZoneInterventionMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-surface overflow-hidden">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Texte */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-accent text-sm font-semibold uppercase tracking-widest"
            >
              Là où nous intervenons
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl font-bold text-primary-800 mt-2 mb-5 leading-tight"
            >
              Zone<br />
              <span className="text-accent">d&rsquo;intervention</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-text-muted leading-relaxed mb-8 text-base sm:text-lg"
            >
              Basés à Champagney (70290), nous intervenons dans un rayon de{" "}
              <span className="text-accent font-semibold">100 kilomètres</span> sur
              5 départements : Haute-Saône, Doubs, Territoire de Belfort, Haut-Rhin et Vosges.
            </motion.p>

            {/* Rayon visuel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-5 p-5 bg-white border border-border rounded-xl mb-6"
            >
              <div className="relative flex-shrink-0 w-14 h-14">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="absolute rounded-full"
                    style={{
                      width: n * 18,
                      height: n * 18,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      border: `1px solid rgba(220,38,38,${0.5 / n})`,
                    }}
                  />
                ))}
                <div className="absolute top-1/2 left-1/2 w-7 h-7 rounded-full bg-accent flex items-center justify-center" style={{ transform: "translate(-50%, -50%)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-display font-bold text-base text-primary-800">Rayon de 100 kms</p>
                <p className="text-xs text-text-muted mt-1">Depuis Champagney — 5 départements couverts</p>
              </div>
            </motion.div>
          </div>

          {/* Carte */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-xl border border-border"
            style={{ height: "clamp(280px, 50vw, 460px)" }}
          >
            <MapZone />
            <div className="absolute bottom-4 left-4 z-[999] flex items-center gap-2 px-3 py-2 rounded" style={{ background: "rgba(20,20,20,0.88)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: "#C00000", opacity: 0.85 }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Départements couverts</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
