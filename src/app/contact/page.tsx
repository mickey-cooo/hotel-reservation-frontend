import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ContactHero from '@/components/contact/contact-hero/ContactHero';
import ContactFormSection from '@/components/contact/contact-form-section/ContactFormSection';
import ContactHubs from '@/components/contact/contact-hubs/ContactHubs';
import ContactFaq from '@/components/contact/contact-faq/ContactFaq';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.contactTitle'),
    description: getCommonTranslation(locale, 'metadata.contactDescription'),
  };
}

export default function ContactPage() {
  return (
    <>
      <Navbar variant="light" />
      <ContactHero />
      <ContactFormSection />
      <ContactHubs />
      <ContactFaq />
      <Footer />
    </>
  );
}
