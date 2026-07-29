'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ReviewsPageContent from '@/components/hotel-detail/reviews-page-content/ReviewsPageContent';
import { getHotelByIdAction } from '@/lib/hotel-actions';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

interface ReviewsPageClientProps {
  id: string;
}

export default function ReviewsPageClient({ id }: ReviewsPageClientProps) {
  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHotelByIdAction(id).then((data) => {
      setHotelDetail(data ?? null);
      setLoading(false);
    });
  }, [id]);

  if (!loading && !hotelDetail) notFound();

  if (loading || !hotelDetail) {
    return (
      <>
        <Navbar variant="light" />
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar variant="light" />
      <ReviewsPageContent hotel={hotelDetail} />
      <Footer />
    </>
  );
}
