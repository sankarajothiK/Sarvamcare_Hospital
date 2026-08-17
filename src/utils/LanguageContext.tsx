import React, { createContext, useContext, useState } from "react";
import { translations } from "../data/translations";

export type Language = "en" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "ta" || saved === "en" ? saved : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const section = translations[language];
    // @ts-ignore
    const value = section[key];
    if (value !== undefined) {
      if (typeof value === "string") return value;
    }
    // @ts-ignore
    const fallbackValue = translations["en"][key];
    return typeof fallbackValue === "string" ? fallbackValue : key;
  };

  const tArray = (key: string): string[] => {
    const section = translations[language];
    // @ts-ignore
    const value = section[key];
    if (Array.isArray(value)) return value;
    
    // @ts-ignore
    const fallback = translations["en"][key];
    return Array.isArray(fallback) ? fallback : [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
