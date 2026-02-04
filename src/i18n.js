import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import kz from './locales/kz/translation.json';
import ru from './locales/ru/translation.json';
import en from './locales/en/translation.json';

const resources = {
  kz: { translation: kz },
  ru: { translation: ru },
  en: { translation: en }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
