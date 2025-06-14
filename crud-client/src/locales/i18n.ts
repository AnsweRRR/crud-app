import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import localStorageAvailable from '../utils/localStorageAvailable';
import { defaultLang } from './config-lang';
import enLocales from './langs/en';
import huLocales from './langs/hu';

let lng = defaultLang.value;

const storageAvailable = localStorageAvailable();

if (storageAvailable) {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      hu: { translations: huLocales }
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    // detection: {
    //   order: ['localStorage', 'navigator'],
    //   caches: ['localStorage'],
    //   lookupLocalStorage: 'i18nextLng',
    // },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 