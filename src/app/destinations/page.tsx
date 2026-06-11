import { Box, Container, Grid } from '@mui/material';
import DestinationsHero from '@/components/destinations/destinations-hero/DestinationsHero';
import FilterSidebar from '@/components/destinations/filter/FilterSidebar';
import HotelGrid from '@/components/destinations/hotel-grid/HotelGrid';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { HOTEL_DETAILS } from '@/lib/hotel-data';
import styles from './page.module.scss';

const HOTELS = HOTEL_DETAILS;

export default function DestinationsPage() {
  return (
    <>
      <Navbar />
      <DestinationsHero />
      <Box className={styles.pageContent}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }}>
              <FilterSidebar />
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <HotelGrid hotels={HOTELS} totalCount={HOTELS.length} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
