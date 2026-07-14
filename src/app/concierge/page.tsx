import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ConciergeHero from '@/components/concierge/concierge-hero/ConciergeHero';
import ConciergeChat from '@/components/concierge/concierge-chat/ConciergeChat';
import ConciergeOptions from '@/components/concierge/concierge-options/ConciergeOptions';

export const metadata = {
  title: 'Lumina Concierge — Lumina Stay',
  description:
    'Our Lumina Concierge is available 24/7 to assist with your journey, from suite upgrades to personalized itinerary planning.',
};

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
