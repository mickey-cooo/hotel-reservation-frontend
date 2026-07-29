'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Container } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import BookingDetailContent from '@/components/bookings/booking-detail-content/BookingDetailContent';
import { getHotelByIdAction } from '@/lib/hotel-actions';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

function nightsBetween(a: string, b: string): number {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

function BookingDetailPageFallback() {
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

export default function BookingDetailPage() {
  return (
    <Suspense fallback={<BookingDetailPageFallback />}>
      <BookingDetailPageInner />
    </Suspense>
  );
}

function BookingDetailPageInner() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelId') ?? undefined;
  const roomId = searchParams.get('roomId') ?? undefined;
  const checkIn = searchParams.get('checkIn') ?? undefined;
  const checkOut = searchParams.get('checkOut') ?? undefined;
  const adults = searchParams.get('adults') ?? undefined;
  const children = searchParams.get('children') ?? undefined;
  const firstName = searchParams.get('firstName') ?? undefined;
  const lastName = searchParams.get('lastName') ?? undefined;
  const email = searchParams.get('email') ?? undefined;
  const address = searchParams.get('address') ?? undefined;
  const roomName = searchParams.get('roomName') ?? undefined;

  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) return;
    getHotelByIdAction(hotelId).then((data) => {
      setHotelDetail(data ?? null);
      setLoading(false);
    });
  }, [hotelId]);

  if (!hotelId || !checkIn || !checkOut) notFound();

  if (loading) {
    return <BookingDetailPageFallback />;
  }

  if (!hotelDetail) notFound();

  const room = hotelDetail.rooms.find((r) => r.id === roomId) ?? hotelDetail.rooms[0];
  const nights = nightsBetween(checkIn, checkOut);

  return (
    <>
      <Navbar variant="light" />
      <Container maxWidth="lg">
        <BookingDetailContent
          bookingRef={id}
          hotel={hotelDetail}
          pricePerNight={room?.price ?? 0}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={parseInt(adults ?? '2', 10)}
          childrenCount={parseInt(children ?? '0', 10)}
          nights={nights}
          guestFirstName={firstName ?? ''}
          guestLastName={lastName ?? ''}
          guestEmail={email ?? ''}
          guestAddress={address ?? ''}
          roomName={roomName ?? room?.name ?? 'Standard Room'}
        />
      </Container>
      <Footer />
    </>
  );
}
