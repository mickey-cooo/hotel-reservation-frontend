import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PrivacyPolicyContent from '@/components/privacy-policy/privacy-policy-content/PrivacyPolicyContent';

export const metadata = {
  title: 'Privacy Policy — Lumina Stay',
  description:
    'Learn how Lumina Stay collects, uses, and protects your personal data in accordance with global privacy regulations.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar variant="light" />
      <PrivacyPolicyContent />
      <Footer />
    </>
  );
}
