import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  hu: {
    translation: {
      home: 'Főoldal',
      users: 'Felhasználók',
      language: 'Nyelv',
      theme: 'Téma',
      light: 'Világos',
      dark: 'Sötét',
      system: 'Rendszer',
      default: 'Alapértelmezett',
      red: 'Piros',
      rose: 'Rózsaszín',
      orange: 'Narancssárga',
      green: 'Zöld',
      blue: 'Kék',
      yellow: 'Sárga',
      violet: 'Lila',
    }
  },
  en: {
    translation: {
      home: 'Home',
      users: 'Users',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      default: 'Default',
      red: 'Red',
      rose: 'Rose',
      orange: 'Orange',
      green: 'Green',
      blue: 'Blue',
      yellow: 'Yellow',
      violet: 'Violet',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 