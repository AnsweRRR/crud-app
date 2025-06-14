import { useTranslation } from 'react-i18next';
import localStorageAvailable from '../utils/localStorageAvailable';
import { allLangs, defaultLang } from './config-lang';

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const storageAvailable = localStorageAvailable();

  const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : '';

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: (text: string, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
