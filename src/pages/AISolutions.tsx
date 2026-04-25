import { motion } from "framer-motion";
import { Link } from "wouter";
import { Cpu, Network, Database, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

export default function AISolutions() {
  const { t } = useLanguage();

  const capabilities = [
    { icon: Network, title: t.ai.c1Title, desc: t.ai.c1Desc },
    { icon: Database, title: t.ai.c2Title, desc: t.ai.c2Desc },
    { icon: Cpu, title: t.ai.c3Title, desc: t.ai.c3Desc },
    { icon: Lock, title: t.ai.c4Title, desc: t.ai.c4Desc },
  ];

  const dashItems = [t.ai.d1, t.ai.d2, t.ai.d3];

  return (
    <div className="w-full pt-44 sm:pt-52 pb-16 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-primary/20">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t.ai.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
              {t.ai.title1} <span className="text-gradient-primary">{t.ai.title2}</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              {t.ai.sub}
            </p>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/contact">{t.ai.demoBtn}</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center mt-4 lg:mt-0"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[80px] sm:blur-[100px] rounded-full" />
            <img
              src={`${import.meta.env.BASE_URL}images/ai-brain.png`}
              alt={t.ai.imgAltBrain}
              className="relative z-10 w-full max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-16 sm:mb-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center text-white mb-8 sm:mb-16">
            {t.ai.capTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {capabilities.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:border-primary transition-colors">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard Showcase */}
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-background"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50 mix-blend-overlay" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 sm:mb-6 whitespace-pre-line">
                {t.ai.dashTitle}
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                {t.ai.dashSub}
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {dashItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-sm sm:text-base font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto" asChild>
                  <Link href="/services">{t.ai.dashBtn}</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-48 sm:h-64 lg:h-auto border-t lg:border-t-0 lg:border-l border-white/10">
              <img
                src={`${import.meta.env.BASE_URL}images/dashboard-mockup.png`}
                alt={t.ai.imgAltDashboard}
                className="absolute inset-0 w-full h-full object-cover object-left"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
