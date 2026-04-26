import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Activity, ShieldCheck, BarChart3, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/i18n/useLanguage";

export default function Home() {
  const { t } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const stats = [
    { title: t.home.stat1Label, desc: t.home.stat1Desc },
    { title: t.home.stat2Label, desc: t.home.stat2Desc },
    { title: t.home.stat3Label, desc: t.home.stat3Desc },
  ];

  const services = [
    { icon: Activity, title: t.home.s1Title, desc: t.home.s1Desc },
    { icon: ShieldCheck, title: t.home.s2Title, desc: t.home.s2Desc },
    { icon: BarChart3, title: t.home.s3Title, desc: t.home.s3Desc },
    { icon: Target, title: t.home.s4Title, desc: t.home.s4Desc },
  ];

  const sectors = [
    t.home.sector1,
    t.home.sector2,
    t.home.sector3,
    t.home.sector4,
    t.home.sector5,
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="AI Data Visualization"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 sm:mb-8 max-w-xs sm:max-w-none text-center"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-blue-200 leading-snug">{t.home.heroBadge}</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold text-white mb-4 sm:mb-6 leading-[1.1]"
            {...fadeIn}
          >
            {t.home.heroTitle1} <br className="hidden sm:block" />
            <span className="text-gradient-primary">{t.home.heroTitle2}</span>
          </motion.h1>

          <motion.p
            className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold tracking-widest uppercase text-primary/80 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {t.home.heroTagline}
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.home.heroSub}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" asChild className="group w-full sm:w-auto h-auto py-3 whitespace-normal text-center leading-snug">
              <Link href="/contact">
                {t.home.heroCta}
                <ArrowRight className="ml-2 w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-auto py-3 whitespace-normal text-center leading-snug">
              <Link href="/ai-solutions">{t.home.heroCtaSecondary}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-8 text-center"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="p-4 sm:p-6 text-center sm:text-left">
                <div className="w-8 h-0.5 bg-primary mb-3 mx-auto sm:mx-0" />
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-1 sm:mb-2 leading-snug">
                  {stat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6">
              {t.home.servicesTitle1} <span className="text-primary">{t.home.servicesTitle2}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
              {t.home.servicesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group cursor-pointer">
                <CardHeader>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base">{service.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Button variant="link" asChild className="text-base sm:text-lg group">
              <Link href="/services">
                {t.home.viewAll}
                <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6">
                {t.home.sectorsTitle1} <br />
                <span className="text-gradient-primary">{t.home.sectorsTitle2}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                {t.home.sectorsSub}
              </p>

              <ul className="space-y-3 mb-8 sm:mb-10">
                {sectors.map((sector, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-white font-medium text-base sm:text-lg">{sector}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/contact">{t.home.sectorsCta}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=600&h=800"
                alt={t.home.imgAlt1}
                className="rounded-2xl object-cover w-full h-[200px] sm:h-[280px] lg:h-[300px] mt-6 lg:mt-8 shadow-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600&h=800"
                alt={t.home.imgAlt2}
                className="rounded-2xl object-cover w-full h-[200px] sm:h-[280px] lg:h-[300px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
