import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enSignIn from '../../public/static/lang/en/signIn.json';
import enSignUp from '../../public/static/lang/en/signUp.json';
import thSignIn from '../../public/static/lang/th/signIn.json';
import thSignUp from '../../public/static/lang/th/signUp.json';
import { DEFAULT_LOCALE, type SupportedLocale } from './locale-cookie';

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    lng: DEFAULT_LOCALE,
    supportedLngs: ['en', 'th'],
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: 'signIn',
    ns: ['signIn', 'signUp'],
    resources: {
      en: {
        signIn: enSignIn,
        signUp: enSignUp,
      },
      th: {
        signIn: thSignIn,
        signUp: thSignUp,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export function syncI18nLanguage(locale: SupportedLocale): void {
  if (i18next.language !== locale) {
    i18next.changeLanguage(locale);
  }
}

export default i18next;
