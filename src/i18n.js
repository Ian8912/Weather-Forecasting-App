import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    /* Load translations using the backend */
    .use(HttpApi)
    /* Detects the user's language */
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'fr', 'es'], /* Specify the languages your app supports */
        fallbackLng: 'en',
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/translation.json', /* Path to translate files */
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;