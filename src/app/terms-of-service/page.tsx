import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import TermsContent from '@/components/terms-of-service/terms-content/TermsContent';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.termsTitle'),
    description: getCommonTranslation(locale, 'metadata.termsDescription'),
  };
}

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar variant="light" />
      <TermsContent />
      <Footer />
    </>
  );
}
