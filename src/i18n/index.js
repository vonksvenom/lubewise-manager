import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';
import daTranslations from './locales/da.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      pt: { translation: ptTranslations },
      es: { translation: esTranslations },
      it: { translation: itTranslations },
      da: { translation: daTranslations },
      fr: { translation: frTranslations },
      de: { translation: deTranslations }
    },
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;