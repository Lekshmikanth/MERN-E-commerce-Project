import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";

import EN_IN from "./locales/en_IN";
import ML_IN from "./locales/ml_IN";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .use(i18nextPlugin)
    // http://localhost:3000?showtranslations
    .init({
        resources: {
            en: {
                translation: { ...EN_IN }
            },
            ml: {
                translation: { ...ML_IN }
            }
        },
        lng: "en",
        fallbackLng: "en-IN",
        debug: true,

        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });


export default i18n;
