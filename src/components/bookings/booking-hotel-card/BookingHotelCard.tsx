import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import type { HotelDetail } from '@/lib/hotel-data';
import styles from './BookingHotelCard.module.scss';

interface BookingHotelCardProps {
  hotel: HotelDetail;
  roomName: string;
}

export default function BookingHotelCard({ hotel, roomName }: BookingHotelCardProps) {
  const starCount = Math.round(hotel.rating);

  return (
    <Box className={styles.card}>
      <Box className={styles.imageWrapper}>
        <Image src={hotel.imageUrl} alt={hotel.name} fill className={styles.image} />
        <Typography className={styles.imageBadge}>PREMIUM COLLECTION</Typography>
      </Box>

      <Box className={styles.info}>
        <Typography className={styles.hotelName}>{hotel.name}</Typography>
        <Box className={styles.starsRow}>
          {Array.from({ length: starCount }).map((_, i) => (
            <StarIcon key={i} className={styles.starIcon} />
          ))}
        </Box>
        <Box className={styles.locationRow}>
          <LocationOnOutlinedIcon className={styles.locationIcon} />
          <Typography className={styles.locationText}>{hotel.location}</Typography>
        </Box>

        <Divider className={styles.divider} />

        <Typography className={styles.roomTypeLabel}>Room Type</Typography>
        <Box className={styles.roomNameRow}>
          <Typography className={styles.roomName}>{roomName}</Typography>
          <WifiOutlinedIcon className={styles.amenityIcon} />
          <AccessibleOutlinedIcon className={styles.amenityIcon} />
        </Box>
      </Box>
    </Box>
  );
}
