import { Box } from '@mui/material';
import NextLink from 'next/link';
import HotelCardImage from '@/components/destinations/hotel-card-image/HotelCardImage';
import HotelCardInfo from '@/components/destinations/hotel-card-info/HotelCardInfo';
import styles from './HotelCard.module.scss';

export interface Hotel {
  id: string;
  badge?: 'TRENDING' | 'FEATURED' | 'EXCLUSIVE';
  name: string;
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const { id, badge, name, location, rating, price, imageUrl } = hotel;

  return (
    <Box
      component={NextLink}
      href={`/destinations/${id}`}
      className={styles.card}
    >
      <HotelCardImage name={name} imageUrl={imageUrl} badge={badge} />
      <HotelCardInfo name={name} location={location} rating={rating} price={price} />
    </Box>
  );
}
