import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import PhotosPageContent from '@/components/hotel-detail/photos-page-content/PhotosPageContent';
import { getHotelById } from '@/lib/hotel-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);
  if (!hotel) return {};
  return {
    title: `All Photos — ${hotel.name} | Lumina Stay`,
    description: `Browse the full photo gallery for ${hotel.name}.`,
  };
}

export default async function HotelPhotosPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) notFound();

  return (
    <>
      <Navbar variant="light" />
      <PhotosPageContent hotel={hotel} />
      <Footer />
    </>
  );
}
