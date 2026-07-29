'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Box, CircularProgress, Container, Divider } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import HotelGallery from '@/components/hotel-detail/hotel-gallery/HotelGallery';
import HotelDetailHeader from '@/components/hotel-detail/hotel-detail-header/HotelDetailHeader';
import HotelAmenities from '@/components/hotel-detail/hotel-amenities/HotelAmenities';
import HotelRoomList from '@/components/hotel-detail/hotel-room-list/HotelRoomList';
import HotelReviews from '@/components/hotel-detail/hotel-reviews/HotelReviews';
import HotelBookingPanel from '@/components/hotel-detail/hotel-booking-panel/HotelBookingPanel';
import Reveal from '@/components/reveal/Reveal';
import WhyLuminaSection from '@/components/why/WhyLuminaSection';
import { getHotelByIdAction } from '@/lib/hotel-actions';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

interface HotelDetailPageClientProps {
  id: string;
}

export default function HotelDetailPageClient({ id }: HotelDetailPageClientProps) {
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
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  const hotel = hotelDetail;

  return (
    <>
      <Navbar variant="light" />

      <Box className={styles.page}>
        <Container maxWidth="lg">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Destinations', href: '/destinations' },
              { label: hotel.name },
            ]}
          />
          <HotelGallery
            images={hotel.galleryImages}
            hotelName={hotel.name}
            hotelId={hotel.id}
          />

          <Box className={styles.contentGrid}>
            <Box className={styles.mainContent}>
              <HotelDetailHeader
                name={hotel.name}
                location={hotel.location}
                rating={hotel.rating}
                reviewCount={hotel.reviewCount}
                description={hotel.description}
              />

              <Divider className={styles.divider} />

              <HotelAmenities amenities={hotel.amenities} />

              <Divider className={styles.divider} />

              <HotelRoomList rooms={hotel.rooms} hotelId={hotel.id} />

              <Divider className={styles.divider} />

              <HotelReviews
                reviews={hotel.reviews}
                reviewCount={hotel.reviewCount}
                hotelId={hotel.id}
              />
            </Box>

            <Box className={styles.sidePanel}>
              <HotelBookingPanel
                rooms={hotel.rooms}
                rating={hotel.rating}
                hotelId={hotel.id}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Reveal>
        <WhyLuminaSection />
      </Reveal>

      <Footer />
    </>
  );
}
