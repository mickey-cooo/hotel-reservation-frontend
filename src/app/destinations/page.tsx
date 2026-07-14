import { Box, Container } from '@mui/material';
import DestinationsHero from '@/components/destinations/destinations-hero/DestinationsHero';
import DestinationsResults from '@/components/destinations/destinations-results/DestinationsResults';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { getAllHotels } from '@/lib/hotel-adapter';
import styles from './page.module.scss';

export default async function DestinationsPage() {
  const { hotels, totalCount } = await getAllHotels();

  return (
    <>
      <Navbar />
      <DestinationsHero />
      <Box className={styles.pageContent}>
        <Container maxWidth="lg">
          <DestinationsResults hotels={hotels} totalCount={totalCount} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
