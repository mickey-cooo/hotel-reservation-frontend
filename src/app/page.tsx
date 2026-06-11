import Footer from '@/components/footer/Footer';
import HeroSection from '@/components/hero/HeroSection';
import MostBookedSection from '@/components/destinations/most-booked/MostBookedSection';
import Navbar from '@/components/navbar/Navbar';
import TrustBar from '@/components/trust/TrustBar';
import WhyLuminaSection from '@/components/why/WhyLuminaSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <MostBookedSection />
      <WhyLuminaSection />
      <Footer />
    </>
  );
}
