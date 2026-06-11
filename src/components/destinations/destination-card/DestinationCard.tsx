import { Box, Chip, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import NextLink from 'next/link';
import styles from './DestinationCard.module.scss';

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
    <NextLink href={href} className={styles.card}>
      <Box className={styles.imageWrapper}>
        <Box
          component="img"
          src={imageUrl}
          alt={name}
          className={styles.cardImage}
        />
        {label && (
          <Chip label={label} size="small" className={styles.badge} />
        )}
        <IconButton size="small" className={styles.favoriteBtn}>
          <FavoriteBorderIcon className={styles.favoriteIcon} />
        </IconButton>
      </Box>

      <Box className={styles.cardBody}>
        <Box className={styles.titleRow}>
          <Typography className={styles.cardTitle}>{name}</Typography>
          <Box className={styles.ratingBox}>
            <StarIcon className={styles.starIcon} />
            <Typography className={styles.ratingText}>{rating.toFixed(1)}</Typography>
          </Box>
        </Box>
        <Typography className={styles.locationText}>{location}</Typography>
        <Box className={styles.priceRow}>
          <Typography className={styles.price}>${price}</Typography>
          <Typography className={styles.perNight}>/night</Typography>
        </Box>
      </Box>
    </NextLink>
  );
}
