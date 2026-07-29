import { notFound } from 'next/navigation';
import { getHotelById } from '@/lib/hotel-adapter';
import PhotosPageClient from './PhotosPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);
  if (!hotel) return {};
  return {
    title: `All Photos — ${hotel.name} | Lumina Stay`,
    description: `Browse the full photo gallery for ${hotel.name}.`,
  };
}

export default async function HotelPhotosPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  if (!hotel) notFound();

  return <PhotosPageClient id={id} />;
}
