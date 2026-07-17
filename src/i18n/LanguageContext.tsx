import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, getTranslation, getFontClass, TranslationKey } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('maatritrack-lang');
    return (saved as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('maatritrack-lang', lang);
  };

  const t = (key: TranslationKey) => getTranslation(language, key);
  const fontClass = getFontClass(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.className = fontClass;
  }, [language, fontClass]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, fontClass }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
