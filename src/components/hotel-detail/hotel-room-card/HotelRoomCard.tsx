import { Box, Button, Chip, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import type { Room } from '@/lib/hotel-data';
import styles from './HotelRoomCard.module.scss';

interface HotelRoomCardProps {
  room: Room;
}

const BADGE_LABELS: Record<NonNullable<Room['badge']>, string> = {
  BESTSELLER: 'Recommended',
  FEATURED: 'Popular',
};

export default function HotelRoomCard({ room }: HotelRoomCardProps) {
  const { name, badge, capacity, sizeSqm, features, price, imageUrl } = room;

  return (
    <Box className={styles.card}>
      <Box className={styles.imageWrapper}>
        <Box component="img" src={imageUrl} alt={name} className={styles.image} />
      </Box>

      <Box className={styles.content}>
        <Box className={styles.topRow}>
          <Typography className={styles.roomName}>{name}</Typography>
          {badge && (
            <Chip
              label={BADGE_LABELS[badge]}
              size="small"
              className={`${styles.badge} ${badge === 'BESTSELLER' ? styles.badgeBestseller : styles.badgeFeatured}`}
            />
          )}
        </Box>

        <Box className={styles.capacityRow}>
          <Box className={styles.capacityItem}>
            <AspectRatioIcon className={styles.capacityIcon} />
            <Typography className={styles.capacityText}>{sizeSqm} sqm</Typography>
          </Box>
          <Box className={styles.capacityItem}>
            <PersonOutlineIcon className={styles.capacityIcon} />
            <Typography className={styles.capacityText}>{capacity.adults} adults</Typography>
          </Box>
          {capacity.children > 0 && (
            <Box className={styles.capacityItem}>
              <ChildCareIcon className={styles.capacityIcon} />
              <Typography className={styles.capacityText}>{capacity.children} children</Typography>
            </Box>
          )}
        </Box>

        <Box className={styles.featureList}>
          {features.map((feature) => (
            <Box key={feature} className={styles.featureItem}>
              <CheckCircleOutlineIcon className={styles.checkIcon} />
              <Typography className={styles.featureText}>{feature}</Typography>
            </Box>
          ))}
        </Box>

        <Box className={styles.bottomRow}>
          <Box className={styles.priceBlock}>
            <Typography className={styles.price}>
              ฿{price.toLocaleString()}
            </Typography>
            <Typography className={styles.perNight}>/night</Typography>
          </Box>
          <Button variant="contained" className={styles.bookBtn}>
            Book
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
