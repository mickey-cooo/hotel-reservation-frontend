import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ContactHero from '@/components/contact/contact-hero/ContactHero';
import ContactFormSection from '@/components/contact/contact-form-section/ContactFormSection';
import ContactHubs from '@/components/contact/contact-hubs/ContactHubs';
import ContactFaq from '@/components/contact/contact-faq/ContactFaq';

export const metadata = {
  title: 'Contact Us — Lumina Stay',
  description:
    "Get in touch with Lumina Stay's global concierge team for personalized assistance with your luxury travel.",
};

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
