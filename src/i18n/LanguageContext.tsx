import { createContext, useState, useEffect, type ReactNode } from "react";
import en, { type Translations } from "./en";
import es from "./es";

type Language = "en" | "es";

export interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}

const translations: Record<Language, Translations> = { en, es };
const STORAGE_KEY = "assegura-lang";

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "es" ? "es" : "en";
    } catch {
      return "en";
    }
  });

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
