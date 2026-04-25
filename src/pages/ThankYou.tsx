import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";
import { CheckCircle2, ArrowRight, Calendar } from "lucide-react";

export default function ThankYou() {
  const { t } = useLanguage();
  const ty = t.thankYou;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </motion.div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6">
          <span className="text-xs font-medium text-blue-200">{ty.badge}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4 leading-tight">
          {ty.title1}{" "}
          <span className="text-gradient-primary">{ty.title2}</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {ty.text}
        </p>

        <Button size="lg" asChild className="group">
          <Link href="/contact">
            <Calendar className="mr-2 w-5 h-5" />
            {ty.ctaBtn}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
