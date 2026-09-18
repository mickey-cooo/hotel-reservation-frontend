import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import MuiThemeRegistry from './MuiThemeRegistry';
import I18nProvider from './I18nProvider';
import { themeColorVars } from './theme';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.siteTitle'),
    description: getCommonTranslation(locale, 'metadata.siteDescription'),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${geistSans.variable}`}>
      <head>
        <style>{themeColorVars}</style>
      </head>
      <body>
        <I18nProvider initialLng={locale}>
          <MuiThemeRegistry>{children}</MuiThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
}
