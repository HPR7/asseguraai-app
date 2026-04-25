import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/useLanguage";
import type { Translations } from "@/i18n/en";

type FormValues = {
  name: string;
  company: string;
  sector: string;
  email: string;
  message: string;
  urgency: string;
  privacy: boolean;
};

function ContactForm({ t, lang }: { t: Translations; lang: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t.contact.nameError),
    company: z.string().min(2, t.contact.companyError),
    sector: z.string().min(1, t.contact.sectorError),
    email: z.string().email(t.contact.emailError),
    message: z.string().min(10, t.contact.messageError),
    urgency: z.string().min(1, t.contact.urgencyError),
    privacy: z.literal(true, { errorMap: () => ({ message: t.contact.privacyError }) }),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      sector: "",
      email: "",
      message: "",
      urgency: "",
      privacy: false,
    },
  });

  const privacyAccepted = form.watch("privacy");

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          sector: data.sector,
          message: data.message,
          urgency: data.urgency,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      toast({
        title: t.contact.toastTitle,
        description: t.contact.toastDesc,
      });
      form.reset();
    } catch {
      toast({
        title: lang === "es" ? "Error al enviar" : "Submission error",
        description: lang === "es"
          ? "Hubo un problema al enviar tu solicitud. Intenta nuevamente."
          : "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t.contact.nameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contact.namePlaceholder} className="bg-background border-white/10 text-white focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t.contact.emailField}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contact.emailPlaceholder} className="bg-background border-white/10 text-white focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t.contact.companyLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contact.companyPlaceholder} className="bg-background border-white/10 text-white focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t.contact.sectorLabel}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-white/10 text-white focus:ring-primary">
                      <SelectValue placeholder={t.contact.sectorPlaceholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem value="mining">{t.contact.sector1}</SelectItem>
                    <SelectItem value="energy">{t.contact.sector2}</SelectItem>
                    <SelectItem value="construction">{t.contact.sector3}</SelectItem>
                    <SelectItem value="industrial">{t.contact.sector4}</SelectItem>
                    <SelectItem value="insurance">{t.contact.sector5}</SelectItem>
                    <SelectItem value="other">{t.contact.sector6}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t.contact.messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.contact.messagePlaceholder}
                  className="min-h-[120px] bg-background border-white/10 text-white focus-visible:ring-primary resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t.contact.urgencyLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background border-white/10 text-white focus:ring-primary">
                    <SelectValue placeholder={t.contact.urgencyPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-white/10 text-white">
                  <SelectItem value="immediate">{t.contact.urgency1}</SelectItem>
                  <SelectItem value="1-3months">{t.contact.urgency2}</SelectItem>
                  <SelectItem value="exploration">{t.contact.urgency3}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Privacy checkbox */}
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy-checkbox"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-background accent-primary cursor-pointer shrink-0"
                />
                <label htmlFor="privacy-checkbox" className="text-sm text-muted-foreground cursor-pointer leading-snug">
                  {t.contact.privacyLabel}{" "}
                  <a href="/privacy" className="text-primary underline hover:text-primary/80">
                    {t.contact.privacyLink}
                  </a>{" "}
                  {t.contact.privacyAnd}{" "}
                  <a href="/terms" className="text-primary underline hover:text-primary/80">
                    {t.contact.termsLink}
                  </a>
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t.contact.submitting}
            </>
          ) : (
            t.contact.submitBtn
          )}
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-muted-foreground text-sm">{lang === "es" ? "o" : "or"}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <a
          href={privacyAccepted ? "https://wa.me/51993474925" : undefined}
          onClick={!privacyAccepted ? (e) => e.preventDefault() : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            privacyAccepted
              ? "hover:opacity-90 active:scale-95 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          }`}
          style={{ backgroundColor: "#25D366" }}
        >
          <MessageCircle className="w-5 h-5" />
          {t.contact.whatsappBtn}
        </a>
      </form>
    </Form>
  );
}

export default function Contact() {
  const { t, lang } = useLanguage();

  const contactItems = [
    {
      icon: MapPin,
      label: t.contact.hqLabel,
      content: t.contact.hqAddress,
    },
    {
      icon: Mail,
      label: t.contact.emailLabel,
      content: "contacto@asseguraai.com\nventas@asseguraai.com",
    },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      content: t.contact.phoneHours,
    },
  ];

  return (
    <div className="w-full pt-44 sm:pt-52 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              {t.contact.title1} <br />
              <span className="text-gradient-primary">{t.contact.title2}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              {t.contact.sub}
            </p>

            <div className="space-y-8">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{item.label}</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form — key forces remount on language change so zod picks up new error strings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">{t.contact.formTitle}</h3>
            <ContactForm key={lang} t={t} lang={lang} />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
