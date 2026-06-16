import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import HelpCenterContent from '@/components/help-center/help-center-content/HelpCenterContent';

export const metadata = {
  title: 'Help Center — Lumina Stay',
  description:
    'Find answers to common questions about bookings, payments, cancellations, and account management at Lumina Stay.',
};

export default function HelpCenterPage() {
  return (
    <>
      <Navbar variant="light" />
      <HelpCenterContent />
      <Footer />
    </>
  );
}
