import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import StatusBadge from '@/components/ui/status-badge/StatusBadge';
import PriceRow from '@/components/ui/price-row/PriceRow';
import type { Room } from '@/models/entity/hotel-room/hotel-room.model';
import styles from './HotelRoomCard.module.scss';

interface HotelRoomCardProps {
  room: Room;
  hotelId: string;
}

const BADGE_CONFIG: Record<
  NonNullable<Room['badge']>,
  { label: string; background: string; color: string; border: string }
> = {
  BESTSELLER: {
    label: 'Recommended',
    background: 'rgba(197, 160, 89, 0.15)',
    color: '#96700a',
    border: '1px solid rgba(197, 160, 89, 0.4)',
  },
  FEATURED: {
    label: 'Popular',
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#1d4ed8',
    border: '1px solid rgba(59, 130, 246, 0.25)',
  },
};

export default function HotelRoomCard({ room, hotelId }: HotelRoomCardProps) {
  const { id, name, badge, capacity, sizeSqm, features, price, imageUrl } = room;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  return (
    <Box className={styles.card}>
      <Box className={styles.imageWrapper}>
        {showImage ? (
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            className={styles.image}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Box className={styles.imageFallback}>{name.charAt(0).toUpperCase()}</Box>
        )}
      </Box>

      <Box className={styles.content}>
        <Box className={styles.topRow}>
          <Typography className={styles.roomName}>{name}</Typography>
          {badge && (
            <StatusBadge
              label={BADGE_CONFIG[badge].label}
              background={BADGE_CONFIG[badge].background}
              color={BADGE_CONFIG[badge].color}
              border={BADGE_CONFIG[badge].border}
              className={styles.badge}
            />
          )}
        </Box>

        <Box className={styles.capacityRow}>
          {sizeSqm > 0 && (
            <Box className={styles.capacityItem}>
              <AspectRatioIcon className={styles.capacityIcon} />
              <Typography className={styles.capacityText}>{sizeSqm} sqm</Typography>
            </Box>
          )}
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
          <PriceRow
            amount={price}
            currency="฿"
            className={styles.priceBlock}
            amountClassName={styles.price}
            unitClassName={styles.perNight}
          />
          <Button
            variant="contained"
            component={NextLink}
            href={`/destinations/${hotelId}?roomId=${id}`}
            className={styles.bookBtn}
          >
            Book
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
