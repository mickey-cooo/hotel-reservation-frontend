import { notFound } from 'next/navigation';
import { Container } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import BookingDetailContent from '@/components/bookings/booking-detail-content/BookingDetailContent';
import { getHotelById } from '@/lib/hotel-adapter';

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    hotelId?: string;
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    roomName?: string;
  }>;
}

function nightsBetween(a: string, b: string): number {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

export default async function BookingDetailPage({ params, searchParams }: BookingDetailPageProps) {
  const { id } = await params;
  const { hotelId, roomId, checkIn, checkOut, adults, children, firstName, lastName, email, address, roomName } =
    await searchParams;

  if (!hotelId || !checkIn || !checkOut) notFound();

  const hotel = await getHotelById(hotelId);
  if (!hotel) notFound();

  const room = hotel.rooms.find((r) => r.id === roomId) ?? hotel.rooms[0];

  const nights = nightsBetween(checkIn, checkOut);

  return (
    <>
      <Navbar variant="light" />
      <Container maxWidth="lg">
        <BookingDetailContent
          bookingRef={id}
          hotel={hotel}
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
