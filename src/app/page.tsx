import Footer from '@/components/footer/Footer';
import HeroSection from '@/components/hero/HeroSection';
import MostBookedSection from '@/components/destinations/most-booked/MostBookedSection';
import Navbar from '@/components/navbar/Navbar';
import Reveal from '@/components/reveal/Reveal';
import TrustBar from '@/components/trust/TrustBar';
import WhyLuminaSection from '@/components/why/WhyLuminaSection';
import { getAllHotels } from '@/lib/hotel-adapter';

export default async function Home() {
  const { hotels } = await getAllHotels(1, 3);

  return (
    <>
      <Navbar />
      <HeroSection />
      <Reveal>
        <TrustBar />
      </Reveal>
      <Reveal>
        <MostBookedSection hotels={hotels} />
      </Reveal>
      <Reveal>
        <WhyLuminaSection />
      </Reveal>
      <Footer />
    </>
  );
}
