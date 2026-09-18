import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PrivacyPolicyContent from '@/components/privacy-policy/privacy-policy-content/PrivacyPolicyContent';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.privacyTitle'),
    description: getCommonTranslation(locale, 'metadata.privacyDescription'),
  };
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar variant="light" />
      <PrivacyPolicyContent />
      <Footer />
    </>
  );
}
