import { Link } from "wouter";
import { Mail, MapPin, MessageCircle, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-background border-t border-white/10 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12 items-start">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-start -mt-3 -ml-3">
              <img
                src={`${import.meta.env.BASE_URL}images/logo_nobg.png`}
                alt="ASSEGURA AI"
                className="h-12 sm:h-14 w-auto object-contain object-left-top drop-shadow-[0_0_16px_rgba(26,116,255,0.5)]"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4 pt-1">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-label="X">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 sm:mb-6 text-sm sm:text-base">{t.footer.company}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t.footer.about}</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t.footer.ourServices}</Link></li>
              <li><Link href="/ai-solutions" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t.footer.aiSolutions}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>

          {/* Services — hidden on small mobile, shown from sm */}
          <div className="hidden sm:block">
            <h4 className="font-display font-semibold text-white mb-4 sm:mb-6 text-sm sm:text-base">{t.footer.expertise}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-muted-foreground text-sm">{t.footer.riskAssessment}</li>
              <li className="text-muted-foreground text-sm">{t.footer.incidentPrediction}</li>
              <li className="text-muted-foreground text-sm">{t.footer.isoImplementation}</li>
              <li className="text-muted-foreground text-sm">{t.footer.safetyAudits}</li>
              <li className="text-muted-foreground text-sm">{t.footer.hseDashboards}</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display font-semibold text-white mb-4 sm:mb-6 text-sm sm:text-base">{t.footer.contactUs}</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {t.contact.hqLabel}<br />
                  {t.contact.hqAddress}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  contacto@asseguraai.com<br />
                  ventas@asseguraai.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{t.contact.phoneHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} ASSEGURA AI. {t.footer.rights}
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a href="/privacy" className="text-muted-foreground hover:text-white text-xs sm:text-sm transition-colors">{t.footer.privacy}</a>
            <a href="/terms" className="text-muted-foreground hover:text-white text-xs sm:text-sm transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
