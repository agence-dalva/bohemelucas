"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Galerie", href: "/galerie" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
        )}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-display text-lg sm:text-xl font-bold transition-colors duration-300",
                  isTransparent ? "text-white" : "text-primary-700"
                )}
              >
                Bohème Lucas
              </span>
              <span
                className={cn(
                  "text-xs font-medium tracking-wide transition-colors duration-300",
                  isTransparent ? "text-white/70" : "text-accent"
                )}
              >
                CHARPENTE · COUVERTURE · ZINGUERIE
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200",
                    isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-primary-700 hover:text-primary-800",
                    pathname === link.href &&
                      (isTransparent ? "text-white" : "text-primary-800")
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={cn(
                        "absolute bottom-0 left-4 right-4 h-0.5 rounded-full",
                        isTransparent ? "bg-accent" : "bg-accent"
                      )}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                variant="accent"
                size="default"
                className={cn(
                  "transition-all duration-300",
                  isTransparent
                    ? "bg-transparent border border-white text-white hover:bg-white hover:text-primary-800"
                    : "bg-accent border border-accent text-white hover:bg-accent/90"
                )}
              >
                <Link href="/contact">Devis gratuit</Link>
              </Button>

              <div className={cn("w-px h-5 transition-colors duration-300", isTransparent ? "bg-white/30" : "bg-border")} />

              <a
                href="https://www.facebook.com/p/SARL-boheme-Lucas-100087263357238/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez-nous sur Facebook"
                className={cn(
                  "flex items-center transition-colors duration-200",
                  isTransparent ? "text-white/70 hover:text-white" : "text-primary-400 hover:text-[#1877F2]"
                )}
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-primary-700 hover:bg-primary-50"
              )}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 sm:top-20 z-40 bg-white border-b border-border shadow-xl md:hidden"
          >
            <nav className="container-max px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary-50 text-primary-800 font-semibold"
                        : "text-primary-700 hover:bg-surface"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
                <a
                  href="https://www.facebook.com/p/SARL-boheme-Lucas-100087263357238/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary-700"
                >
                  <Facebook className="w-4 h-4 text-accent" />
                  Suivez-nous sur Facebook
                </a>
                <Button asChild variant="accent" className="mx-4">
                  <Link href="/contact">Demander un devis gratuit</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
