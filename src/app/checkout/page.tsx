import { notFound } from 'next/navigation';
import { Container } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CheckoutContent from '@/components/checkout/checkout-content/CheckoutContent';
import { getHotelById } from '@/lib/hotel-data';

interface CheckoutPageProps {
  searchParams: Promise<{
    hotelId?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  }>;
}

function nightsBetween(a: string, b: string): number {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { hotelId, checkIn, checkOut, adults, children } = await searchParams;

  if (!hotelId || !checkIn || !checkOut) notFound();

  const hotel = getHotelById(hotelId);
  if (!hotel) notFound();

  const nights = nightsBetween(checkIn, checkOut);
  const adultsCount = parseInt(adults ?? '2', 10);
  const childrenCount = parseInt(children ?? '0', 10);

  return (
    <>
      <Navbar variant="light" />
      <Container maxWidth="lg">
        <CheckoutContent
          hotel={hotel}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adultsCount}
          children={childrenCount}
          nights={nights}
        />
      </Container>
      <Footer />
    </>
  );
}
