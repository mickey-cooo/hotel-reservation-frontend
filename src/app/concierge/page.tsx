import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ConciergeHero from '@/components/concierge/concierge-hero/ConciergeHero';
import ConciergeChat from '@/components/concierge/concierge-chat/ConciergeChat';
import ConciergeOptions from '@/components/concierge/concierge-options/ConciergeOptions';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.conciergeTitle'),
    description: getCommonTranslation(locale, 'metadata.conciergeDescription'),
  };
}

export default function ConciergePage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <ConciergeHero />
        <ConciergeChat />
        <ConciergeOptions />
      </main>
      <Footer />
    </>
  );
}
