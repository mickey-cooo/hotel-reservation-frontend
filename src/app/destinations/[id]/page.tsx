import { notFound } from 'next/navigation';
import { Box, Container, Divider } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import HotelGallery from '@/components/hotel-detail/hotel-gallery/HotelGallery';
import HotelDetailHeader from '@/components/hotel-detail/hotel-detail-header/HotelDetailHeader';
import HotelAmenities from '@/components/hotel-detail/hotel-amenities/HotelAmenities';
import HotelRoomList from '@/components/hotel-detail/hotel-room-list/HotelRoomList';
import HotelReviews from '@/components/hotel-detail/hotel-reviews/HotelReviews';
import HotelBookingPanel from '@/components/hotel-detail/hotel-booking-panel/HotelBookingPanel';
import WhyLuminaSection from '@/components/why/WhyLuminaSection';
import { getHotelById } from '@/lib/hotel-data';
import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);
  if (!hotel) return {};
  return {
    title: `${hotel.name} — Lumina Stay`,
    description: hotel.description,
  };
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) notFound();

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
          <HotelGallery images={hotel.galleryImages} hotelName={hotel.name} hotelId={hotel.id} />

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

              <HotelRoomList rooms={hotel.rooms} />

              <Divider className={styles.divider} />

              <HotelReviews reviews={hotel.reviews} reviewCount={hotel.reviewCount} hotelId={hotel.id} />
            </Box>

            <Box className={styles.sidePanel}>
              <HotelBookingPanel
                price={hotel.price}
                rating={hotel.rating}
                hotelName={hotel.name}
                hotelId={hotel.id}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <WhyLuminaSection />

      <Footer />
    </>
  );
}
