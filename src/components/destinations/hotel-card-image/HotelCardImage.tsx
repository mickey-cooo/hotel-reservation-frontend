import { Box, Chip, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './HotelCardImage.module.scss';

type HotelBadge = 'TRENDING' | 'FEATURED' | 'EXCLUSIVE';

const BADGE_CLASS: Record<HotelBadge, string> = {
  TRENDING: styles.badgeTrending,
  FEATURED: styles.badgeFeatured,
  EXCLUSIVE: styles.badgeExclusive,
};

interface HotelCardImageProps {
  name: string;
  imageUrl: string;
  badge?: HotelBadge;
}

export default function HotelCardImage({ name, imageUrl, badge }: HotelCardImageProps) {
  return (
    <Box className={styles.imageWrapper}>
      <Box
        component="img"
        src={imageUrl}
        alt={name}
        className={styles.cardImage}
      />
      {badge && (
        <Chip
          label={badge}
          size="small"
          className={`${styles.badge} ${BADGE_CLASS[badge]}`}
        />
      )}
      <IconButton size="small" className={styles.favoriteBtn}>
        <FavoriteBorderIcon className={styles.favoriteIcon} />
      </IconButton>
    </Box>
  );
}
