import { notFound } from 'next/navigation';
import { getHotelById } from '@/lib/hotel-adapter';
import HotelDetailPageClient from './HotelDetailPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);
  if (!hotel) return {};
  return {
    title: `${hotel.name} — Lumina Stay`,
    description: hotel.description,
  };
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  if (!hotel) notFound();

  return <HotelDetailPageClient id={id} />;
}
