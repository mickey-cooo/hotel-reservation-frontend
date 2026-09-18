import { notFound } from 'next/navigation';
import { getHotelById } from '@/lib/hotel-adapter';
import ReviewsPageClient from './ReviewsPageClient';
import { getServerLocale } from '@/lib/server-locale';
import { getCommonTranslation } from '@/lib/server-common-i18n';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);
  if (!hotel) return {};
  const locale = await getServerLocale();
  return {
    title: getCommonTranslation(locale, 'metadata.reviewsTitle', { name: hotel.name }),
    description: getCommonTranslation(locale, 'metadata.reviewsDescription', { name: hotel.name }),
  };
}

export default async function HotelReviewsPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  if (!hotel) notFound();

  return <ReviewsPageClient id={id} />;
}
