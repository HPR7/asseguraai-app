import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/useLanguage";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t, setLang } = useLanguage();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/ai-solutions", label: t.nav.aiSolutions },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/70 backdrop-blur-lg py-3 shadow-lg"
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 -ml-3">
          <img
            src={`${import.meta.env.BASE_URL}images/logo_nobg.png`}
            alt="ASSEGURA AI"
            className="h-20 sm:h-24 w-auto object-contain object-left drop-shadow-[0_0_16px_rgba(26,116,255,0.5)]"
          />
        </Link>

        {/* Desktop Nav — visible at lg (1024px+) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-2 whitespace-nowrap",
                location === link.href ? "text-white" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center gap-1 border border-white/15 rounded-full px-1 py-1">
            <Globe className="w-3.5 h-3.5 text-muted-foreground ml-1.5 mr-0.5" />
            <button
              onClick={() => setLang("en")}
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full transition-colors",
                lang === "en" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full transition-colors",
                lang === "es" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              ES
            </button>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href="/contact">{t.nav.contact}</Link>
          </Button>
        </nav>

        {/* Mobile/Tablet: Language toggle + hamburger — visible below lg */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 border border-white/15 rounded-full px-1 py-1">
            <button
              onClick={() => setLang("en")}
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full transition-colors",
                lang === "en" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full transition-colors",
                lang === "es" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              ES
            </button>
          </div>
          <button
            className="p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-white/10">
                <Button asChild className="w-full">
                  <Link href="/contact">{t.nav.contact}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
