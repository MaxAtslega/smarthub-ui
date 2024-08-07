import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from '@/i18n/de.json';
import deCH from '@/i18n/de-ch.json';
import deAT from '@/i18n/de-at.json';
import deLI from '@/i18n/de-li.json';
import deLU from '@/i18n/de-lu.json';
import enUS from '@/i18n/en-us.json';
import enGB from '@/i18n/en-gb.json';
import enAU from '@/i18n/en-au.json';
import es from '@/i18n/es.json';
import esMX from '@/i18n/es-mx.json';

const savedLanguage = localStorage.getItem('language') || 'en-us';

// Configure i18n
i18n.use(initReactI18next).init({
    resources: {
        de: { translation: de },
        'de-CH': { translation: deCH },
        'de-AT': { translation: deAT },
        'de-LI': { translation: deLI },
        'de-LU': { translation: deLU },
        'en-US': { translation: enUS },
        'en-GB': { translation: enGB },
        'en-AU': { translation: enAU },
        es: { translation: es },
        'es-MX': { translation: esMX },
    },
    lng: savedLanguage, // Load the saved language
    fallbackLng: 'en-us',
    interpolation: {
        escapeValue: false, // React already safes from XSS
    },
});

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng);
});

export default i18n