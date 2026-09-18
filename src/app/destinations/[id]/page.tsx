import { notFound } from 'next/navigation';
import { getHotelById } from '@/lib/hotel-adapter';
import HotelDetailPageClient from './HotelDetailPageClient';
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
    title: getCommonTranslation(locale, 'metadata.hotelTitle', { name: hotel.name }),
    description: hotel.description,
  };
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  if (!hotel) notFound();

  return <HotelDetailPageClient id={id} />;
}
