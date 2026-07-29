import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import Rating from '@/components/ui/rating/Rating';
import IconLabelRow from '@/components/ui/icon-label-row/IconLabelRow';
import type { HotelDetail } from '@/models/entity/hotel/hotel.model';
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
        <Rating
          value={starCount}
          variant="stars"
          className={styles.starsRow}
          iconClassName={styles.starIcon}
        />
        <IconLabelRow
          icon={LocationOnOutlinedIcon}
          text={hotel.location}
          className={styles.locationRow}
          iconClassName={styles.locationIcon}
          textClassName={styles.locationText}
        />

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
