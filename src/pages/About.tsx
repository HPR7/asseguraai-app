import { motion } from "framer-motion";
import { Award, Users, Globe, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/useLanguage";

function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default function About() {
  const { t } = useLanguage();

  const values = [
    { icon: Zap, title: t.about.v1Title, desc: t.about.v1Desc },
    { icon: Award, title: t.about.v2Title, desc: t.about.v2Desc },
    { icon: Users, title: t.about.v3Title, desc: t.about.v3Desc },
  ];

  return (
    <div className="w-full pt-44 sm:pt-52 pb-16 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
            {t.about.title1}{" "}
            <span className="text-gradient-primary">{t.about.title2}</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground px-2">
            {t.about.sub}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 sm:p-8 md:p-12 rounded-3xl bg-primary/10 border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10">
              <Target className="w-20 h-20 sm:w-32 sm:h-32 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 sm:mb-4">{t.about.missionTitle}</h2>
            <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed">
              {t.about.missionText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 sm:p-8 md:p-12 rounded-3xl bg-card border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5">
              <Globe className="w-20 h-20 sm:w-32 sm:h-32 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 sm:mb-4">{t.about.visionTitle}</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.about.visionText}
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-white mb-8 sm:mb-12">{t.about.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
