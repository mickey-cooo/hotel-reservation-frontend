import { notFound } from 'next/navigation';
import { getHotelById } from '@/lib/hotel-adapter';
import ReviewsPageClient from './ReviewsPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);
  if (!hotel) return {};
  return {
    title: `Guest Reviews — ${hotel.name} | Lumina Stay`,
    description: `Read authentic guest reviews for ${hotel.name}.`,
  };
}

export default async function HotelReviewsPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  if (!hotel) notFound();

  return <ReviewsPageClient id={id} />;
}
