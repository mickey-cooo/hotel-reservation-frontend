import PropertyCard from '@/components/ui/property-card/PropertyCard';
import type { Hotel } from '@/models/entity/hotel/hotel.model';

const BADGE_COLORS: Record<NonNullable<Hotel['badge']>, string> = {
  TRENDING: '#92400E',
  FEATURED: '#78350F',
  EXCLUSIVE: '#451A03',
};

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const { id, badge, name, location, rating, price, imageUrl } = hotel;

  return (
    <PropertyCard
      href={`/destinations/${id}`}
      name={name}
      location={location}
      rating={rating}
      price={price}
      imageUrl={imageUrl}
      badge={
        badge ? { label: badge, background: BADGE_COLORS[badge] } : undefined
      }
    />
  );
}
