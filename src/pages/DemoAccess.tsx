import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/i18n/useLanguage";
import type { Translations } from "@/i18n/en";

type FormValues = {
  name: string;
  company: string;
  email: string;
  industry: string;
};

function DemoAccessForm({ t, lang }: { t: Translations; lang: string }) {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const da = t.demoAccess;

  const schema = z.object({
    name: z.string().min(2, da.nameError),
    company: z.string().min(2, da.companyError),
    email: z.string().email(da.emailError),
    industry: z.string().min(1, da.industryError),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", email: "", industry: "" },
  });

  const industries = [
    { value: "mining", label: da.i1 },
    { value: "energy", label: da.i2 },
    { value: "construction", label: da.i3 },
    { value: "manufacturing", label: da.i4 },
    { value: "insurance", label: da.i5 },
    { value: "other", label: da.i6 },
  ];

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/demo-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      navigate("/thank-you");
    } catch {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{da.nameLabel}</FormLabel>
              <FormControl>
                <Input placeholder={da.namePlaceholder} className="bg-background border-white/10 text-white focus-visible:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{da.companyLabel}</FormLabel>
              <FormControl>
                <Input placeholder={da.companyPlaceholder} className="bg-background border-white/10 text-white focus-visible:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{da.emailLabel}</FormLabel>
            <FormControl>
              <Input type="email" placeholder={da.emailPlaceholder} className="bg-background border-white/10 text-white focus-visible:ring-primary" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="industry" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{da.industryLabel}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-background border-white/10 text-white focus:ring-primary">
                  <SelectValue placeholder={da.industryPlaceholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-card border-white/10">
                {industries.map(ind => (
                  <SelectItem key={ind.value} value={ind.value} className="text-white focus:bg-primary/20">
                    {ind.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{da.submitting}</>
          ) : (
            <><Zap className="mr-2 h-5 w-5" />{da.submitBtn}</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default function DemoAccess() {
  const { t, lang } = useLanguage();
  const da = t.demoAccess;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-blue-200">{da.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            {da.title}
          </h1>
          <p className="text-muted-foreground">{da.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-card border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <DemoAccessForm key={lang} t={t} lang={lang} />
        </motion.div>
      </div>
    </div>
  );
}
