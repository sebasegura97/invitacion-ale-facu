"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import es from "./locales/es.json";
import en from "./locales/en.json";

type Locale = "es" | "en";

type TranslationValues = typeof es;

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Locale, TranslationValues> = {
  es,
  en,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    // Leer el parámetro language de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const langParam = searchParams.get("language");

    if (langParam === "en" || langParam === "es") {
      setLocale(langParam);
    } else {
      // Por defecto español
      setLocale("es");
    }
  }, []);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: TranslationValues | string | Record<string, unknown> =
      translations[locale];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k as keyof typeof value] as
          | string
          | Record<string, unknown>;
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
}
