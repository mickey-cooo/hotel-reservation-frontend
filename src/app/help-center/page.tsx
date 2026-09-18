import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import HelpCenterContent from '@/components/help-center/help-center-content/HelpCenterContent';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.helpTitle'),
    description: getCommonTranslation(locale, 'metadata.helpDescription'),
  };
}

export default function HelpCenterPage() {
  return (
    <>
      <Navbar variant="light" />
      <HelpCenterContent />
      <Footer />
    </>
  );
}
