import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import MuiThemeRegistry from './MuiThemeRegistry';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lumina Stay',
  description: 'Find your next luxury sanctuary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body>
        <MuiThemeRegistry>{children}</MuiThemeRegistry>
      </body>
    </html>
  );
}
