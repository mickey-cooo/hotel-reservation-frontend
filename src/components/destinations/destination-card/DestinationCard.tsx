import PropertyCard from '@/components/ui/property-card/PropertyCard';

interface Destination {
  label?: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
}

interface DestinationCardProps {
  destination: Destination;
  href?: string;
}

export default function DestinationCard({ destination, href = '/destinations' }: DestinationCardProps) {
  const { label, name, location, rating, price, imageUrl } = destination;

  return (
    <PropertyCard
      href={href}
      name={name}
      location={location}
      rating={rating}
      price={price}
      imageUrl={imageUrl}
      badge={label ? { label, background: 'var(--color-gold)' } : undefined}
      variant="outlined"
    />
  );
}
