'use client';

import { I18nextProvider } from 'react-i18next';
import i18next, { syncI18nLanguage } from '@/lib/i18n';
import type { SupportedLocale } from '@/lib/locale-cookie';

interface I18nProviderProps {
  initialLng: SupportedLocale;
  children: React.ReactNode;
}

export default function I18nProvider({
  initialLng,
  children,
}: Readonly<I18nProviderProps>) {
  syncI18nLanguage(initialLng);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
