import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enSignIn from '../../public/static/lang/en/signIn.json';
import enSignUp from '../../public/static/lang/en/signUp.json';
import enCommon from '../../public/static/lang/en/common.json';
import enHome from '../../public/static/lang/en/home.json';
import enDestinations from '../../public/static/lang/en/destinations.json';
import enHotelDetail from '../../public/static/lang/en/hotelDetail.json';
import enCheckout from '../../public/static/lang/en/checkout.json';
import enBookings from '../../public/static/lang/en/bookings.json';
import enMembership from '../../public/static/lang/en/membership.json';
import enContact from '../../public/static/lang/en/contact.json';
import enHelpCenter from '../../public/static/lang/en/helpCenter.json';
import enWhyLumina from '../../public/static/lang/en/whyLumina.json';
import enConcierge from '../../public/static/lang/en/concierge.json';
import enPrivacyPolicy from '../../public/static/lang/en/privacyPolicy.json';
import enTerms from '../../public/static/lang/en/terms.json';
import thSignIn from '../../public/static/lang/th/signIn.json';
import thSignUp from '../../public/static/lang/th/signUp.json';
import thCommon from '../../public/static/lang/th/common.json';
import thHome from '../../public/static/lang/th/home.json';
import thDestinations from '../../public/static/lang/th/destinations.json';
import thHotelDetail from '../../public/static/lang/th/hotelDetail.json';
import thCheckout from '../../public/static/lang/th/checkout.json';
import thBookings from '../../public/static/lang/th/bookings.json';
import thMembership from '../../public/static/lang/th/membership.json';
import thContact from '../../public/static/lang/th/contact.json';
import thHelpCenter from '../../public/static/lang/th/helpCenter.json';
import thWhyLumina from '../../public/static/lang/th/whyLumina.json';
import thConcierge from '../../public/static/lang/th/concierge.json';
import thPrivacyPolicy from '../../public/static/lang/th/privacyPolicy.json';
import thTerms from '../../public/static/lang/th/terms.json';
import { DEFAULT_LOCALE, type SupportedLocale } from './locale-cookie';

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    lng: DEFAULT_LOCALE,
    supportedLngs: ['en', 'th'],
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: 'common',
    ns: [
      'signIn',
      'signUp',
      'common',
      'home',
      'destinations',
      'hotelDetail',
      'checkout',
      'bookings',
      'membership',
      'contact',
      'helpCenter',
      'whyLumina',
      'concierge',
      'privacyPolicy',
      'terms',
    ],
    resources: {
      en: {
        signIn: enSignIn,
        signUp: enSignUp,
        common: enCommon,
        home: enHome,
        destinations: enDestinations,
        hotelDetail: enHotelDetail,
        checkout: enCheckout,
        bookings: enBookings,
        membership: enMembership,
        contact: enContact,
        helpCenter: enHelpCenter,
        whyLumina: enWhyLumina,
        concierge: enConcierge,
        privacyPolicy: enPrivacyPolicy,
        terms: enTerms,
      },
      th: {
        signIn: thSignIn,
        signUp: thSignUp,
        common: thCommon,
        home: thHome,
        destinations: thDestinations,
        hotelDetail: thHotelDetail,
        checkout: thCheckout,
        bookings: thBookings,
        membership: thMembership,
        contact: thContact,
        helpCenter: thHelpCenter,
        whyLumina: thWhyLumina,
        concierge: thConcierge,
        privacyPolicy: thPrivacyPolicy,
        terms: thTerms,
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
