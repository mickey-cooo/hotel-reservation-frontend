'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import DestinationsHero from '@/components/destinations/destinations-hero/DestinationsHero';
import DestinationsResults from '@/components/destinations/destinations-results/DestinationsResults';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { getAllHotelsAction } from '@/lib/hotel-actions';
import type { Hotel } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

export default function DestinationsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllHotelsAction().then(async (firstPage) => {
      if (firstPage.hotels.length >= firstPage.totalCount) {
        setHotels(firstPage.hotels);
        setLoading(false);
        return;
      }

      const allHotels = await getAllHotelsAction(1, firstPage.totalCount);
      setHotels(allHotels.hotels);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <DestinationsHero />
      <Box className={styles.pageContent}>
        <Container maxWidth="lg">
          {loading ? (
            <Box className={styles.loadingContainer}>
              <CircularProgress />
            </Box>
          ) : (
            <DestinationsResults hotels={hotels} />
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
