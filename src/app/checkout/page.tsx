'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Container } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CheckoutContent from '@/components/checkout/checkout-content/CheckoutContent';
import { getHotelByIdAction } from '@/lib/hotel-actions';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

function nightsBetween(a: string, b: string): number {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

function CheckoutPageFallback() {
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutPageFallback />}>
      <CheckoutPageInner />
    </Suspense>
  );
}

function CheckoutPageInner() {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelId') ?? undefined;
  const roomId = searchParams.get('roomId') ?? undefined;
  const checkIn = searchParams.get('checkIn') ?? undefined;
  const checkOut = searchParams.get('checkOut') ?? undefined;
  const adults = searchParams.get('adults') ?? undefined;
  const children = searchParams.get('children') ?? undefined;

  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) return;
    getHotelByIdAction(hotelId).then((data) => {
      setHotelDetail(data ?? null);
      setLoading(false);
    });
  }, [hotelId]);

  if (!hotelId || !roomId || !checkIn || !checkOut) notFound();

  if (loading) {
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

  if (!hotelDetail) notFound();

  const room = hotelDetail.rooms.find((r) => r.id === roomId);
  if (!room) notFound();

  const nights = nightsBetween(checkIn, checkOut);
  const adultsCount = parseInt(adults ?? '2', 10);
  const childrenCount = parseInt(children ?? '0', 10);

  return (
    <>
      <Navbar variant="light" />
      <Container maxWidth="lg">
        <CheckoutContent
          hotel={hotelDetail}
          room={room}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adultsCount}
          childrenCount={childrenCount}
          nights={nights}
        />
      </Container>
      <Footer />
    </>
  );
}
