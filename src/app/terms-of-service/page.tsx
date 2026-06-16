import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import TermsContent from '@/components/terms-of-service/terms-content/TermsContent';

export const metadata = {
  title: 'Terms of Service — Lumina Stay',
  description:
    'Read the terms and conditions governing your use of Lumina Stay and our luxury travel booking services.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar variant="light" />
      <TermsContent />
      <Footer />
    </>
  );
}
