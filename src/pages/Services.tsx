import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, ShieldCheck, BarChart3, Target, FileText, ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: "risk-assessment",
      icon: FileText,
      title: t.services.s1Title,
      description: t.services.s1Desc,
      features: [t.services.s1f1, t.services.s1f2, t.services.s1f3, t.services.s1f4],
    },
    {
      id: "incident-prediction",
      icon: Activity,
      title: t.services.s2Title,
      description: t.services.s2Desc,
      features: [t.services.s2f1, t.services.s2f2, t.services.s2f3, t.services.s2f4],
    },
    {
      id: "iso-implementation",
      icon: ShieldCheck,
      title: t.services.s3Title,
      description: t.services.s3Desc,
      features: [t.services.s3f1, t.services.s3f2, t.services.s3f3, t.services.s3f4],
    },
    {
      id: "safety-audits",
      icon: Target,
      title: t.services.s4Title,
      description: t.services.s4Desc,
      features: [t.services.s4f1, t.services.s4f2, t.services.s4f3, t.services.s4f4],
    },
    {
      id: "hse-dashboards",
      icon: BarChart3,
      title: t.services.s5Title,
      description: t.services.s5Desc,
      features: [t.services.s5f1, t.services.s5f2, t.services.s5f3, t.services.s5f4],
    },
  ];

  return (
    <div className="w-full pt-44 sm:pt-52 pb-16 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
            {t.services.title1} <span className="text-gradient-primary">{t.services.title2}</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground px-2">
            {t.services.sub}
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden border-white/10 hover:border-primary/50 transition-colors">
                {/* Mobile: stacked layout */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-card/80 p-6 sm:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">{service.title}</h3>
                  </div>

                  <div className="md:w-2/3 p-6 sm:p-8">
                    <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-white text-xs sm:text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Explore Platform — demo CTA */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <div className="relative text-center sm:text-left">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                {t.services.s1DemoBtn}
              </p>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {t.services.s1Teaser}
              </h3>
            </div>
            <div className="relative shrink-0">
              <Button size="lg" asChild className="group w-full sm:w-auto shadow-lg shadow-primary/20">
                <Link href="/demo">
                  <Zap className="mr-2 w-5 h-5" />
                  {t.services.s1DemoBtn}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 text-center bg-primary/5 rounded-3xl p-8 sm:p-12 border border-primary/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 sm:mb-4">{t.services.ctaTitle}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            {t.services.ctaSub}
          </p>
          <Button size="lg" asChild className="group w-full sm:w-auto">
            <Link href="/contact">
              {t.services.ctaBtn}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <div className="mt-8 sm:mt-10 border-t border-primary/20 pt-6 sm:pt-8">
            <p className="text-sm sm:text-base font-semibold text-primary uppercase tracking-widest mb-5">
              {t.services.ctaResultsTitle}
            </p>
            <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10">
              {([t.services.ctaResult1, t.services.ctaResult2, t.services.ctaResult3] as string[]).map((item, i) => (
                <li key={i} className="flex items-center justify-center gap-2 text-base sm:text-lg font-medium text-white">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
