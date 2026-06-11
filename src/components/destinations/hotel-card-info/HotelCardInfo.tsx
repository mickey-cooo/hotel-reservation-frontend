import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styles from './HotelCardInfo.module.scss';

interface HotelCardInfoProps {
  name: string;
  location: string;
  rating: number;
  price: number;
}

export default function HotelCardInfo({ name, location, rating, price }: HotelCardInfoProps) {
  return (
    <Box className={styles.cardBody}>
      <Box className={styles.titleRow}>
        <Typography className={styles.cardTitle}>{name}</Typography>
        <Box className={styles.ratingBox}>
          <StarIcon className={styles.starIcon} />
          <Typography className={styles.ratingText}>{rating.toFixed(1)}</Typography>
        </Box>
      </Box>

      <Box className={styles.locationRow}>
        <LocationOnOutlinedIcon className={styles.locationIcon} />
        <Typography className={styles.locationText}>{location}</Typography>
      </Box>

      <Box className={styles.priceRow}>
        <Typography className={styles.price}>${price.toLocaleString()}</Typography>
        <Typography className={styles.perNight}>/night</Typography>
      </Box>
    </Box>
  );
}
