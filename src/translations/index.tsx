import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const supportList = [
  { code: "en-US", name: "English", fallback: "en" },
  { code: "vi-VN", name: "Tiếng Việt", fallback: "vi" },
];

let resources = {
  en: { translation: require("./languages/en.json") },
  vi: { translation: require("./languages/vi.json") },
};
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    keySeparator: false,
    resources,
    lng: localStorage.getItem('currentLanguage') || 'en',
    fallbackLng: ["en", "vi"],
    interpolation: {
      escapeValue: false,
    },
  });
export default i18next;

