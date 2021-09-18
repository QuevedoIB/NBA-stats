import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from 'public/locales/en/translation.json'
import translationES from 'public/locales/es/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false
  },
  fallbackLng: 'en'
})

export default i18n
