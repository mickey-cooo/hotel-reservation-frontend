import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ReviewsPageContent from '@/components/hotel-detail/reviews-page-content/ReviewsPageContent';
import { getHotelById } from '@/lib/hotel-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);
  if (!hotel) return {};
  return {
    title: `Guest Reviews — ${hotel.name} | Lumina Stay`,
    description: `Read authentic guest reviews for ${hotel.name}.`,
  };
}

export default async function HotelReviewsPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) notFound();

  return (
    <>
      <Navbar variant="light" />
      <ReviewsPageContent hotel={hotel} />
      <Footer />
    </>
  );
}
