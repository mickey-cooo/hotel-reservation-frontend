'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PhotosPageContent from '@/components/hotel-detail/photos-page-content/PhotosPageContent';
import { getHotelByIdAction } from '@/lib/hotel-actions';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

interface PhotosPageClientProps {
  id: string;
}

export default function PhotosPageClient({ id }: PhotosPageClientProps) {
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
      <PhotosPageContent hotel={hotelDetail} />
      <Footer />
    </>
  );
}
