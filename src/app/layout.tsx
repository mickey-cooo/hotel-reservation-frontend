import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import MuiThemeRegistry from './MuiThemeRegistry';
import I18nProvider from './I18nProvider';
import { themeColorVars } from './theme';
import { getServerLocale } from '@/lib/server-locale';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lumina Stay',
  description: 'Find your next luxury sanctuary',
};

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
