import en from "../../src/public/locales/en/translation.json";
import es from "../../src/public/locales/es/translation.json";

export const getTranslation = (key = "", replacers) => {
  const params = key.split(".");
  const translations = {
    en,
    es,
  };
  const currentLanguage = window.localStorage
    .getItem("i18nextLng")
    .split("-")[0];

  let text = params.reduce((acc, curr) => {
    return acc[curr];
  }, translations[currentLanguage] || translations.en);

  if (replacers) {
    Object.entries(replacers).forEach(([key, replacement]) => {
      text = text.replace(`{{${key}}}`, replacement);
    });
  }

  return text || "";
};
