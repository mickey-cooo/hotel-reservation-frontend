import { Box } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import WhyLuminaHero from '@/components/why/why-lumina-hero/WhyLuminaHero';
import WhyBookBento from '@/components/why/why-book-bento/WhyBookBento';
import LuminaDifference from '@/components/why/lumina-difference/LuminaDifference';
import LuminaCta from '@/components/why/lumina-cta/LuminaCta';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

export async function generateMetadata() {
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.whyTitle'),
    description: getCommonTranslation(locale, 'metadata.whyDescription'),
  };
}

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
