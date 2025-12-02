import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import CommonEN from "./public/locales/en/common.json";
import CommonFR from "./public/locales/fr/common.json";
import CommonCS from "./public/locales/cs/common.json";

export const languages=["fr", "en", "cs"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    preload: languages,
    fallbackLng: languages[0],
    supportedLngs: languages,
    ns: ["common"],
    nsSeparator: ".",
    defaultNS: "common",
    resources: {
      en: {
        common: CommonEN,
      },
      fr: {
        common: CommonFR,
      },
       cs: {
        common: CommonCS,
      },
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;