import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from 'public/locales/en/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    keySeparator: '.',
    interpolation: {
        escapeValue: false,
    },
    fallbackLng: 'en',
});

export default i18n;
