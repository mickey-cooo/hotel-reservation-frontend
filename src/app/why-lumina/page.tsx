import { Box } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import WhyLuminaHero from '@/components/why/why-lumina-hero/WhyLuminaHero';
import WhyBookBento from '@/components/why/why-book-bento/WhyBookBento';
import LuminaDifference from '@/components/why/lumina-difference/LuminaDifference';
import LuminaCta from '@/components/why/lumina-cta/LuminaCta';

export const metadata = {
  title: 'Why Book with Lumina Stay — Lumina Stay',
  description:
    'Best rate guarantee, secure payment, 24/7 concierge support, and exclusive member rewards — only when you book directly with Lumina Stay.',
};

export default function WhyLuminaPage() {
  return (
    <>
      <Navbar variant="light" />
      <WhyLuminaHero />
      <Box id="why-book">
        <WhyBookBento />
      </Box>
      <LuminaDifference />
      <LuminaCta />
      <Footer />
    </>
  );
}
