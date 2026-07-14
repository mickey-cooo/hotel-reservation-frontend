import { Box, Chip, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import Image from 'next/image';
import styles from './CheckoutSummary.module.scss';

type Badge = 'TRENDING' | 'FEATURED' | 'EXCLUSIVE';

interface CheckoutSummaryProps {
  hotelName: string;
  hotelImageUrl: string;
  badge?: Badge;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  nights: number;
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function guestLabel(adults: number, children: number): string {
  const parts: string[] = [`${adults} Adult${adults > 1 ? 's' : ''}`];
  if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
  return parts.join(', ');
}

export default function CheckoutSummary({
  hotelName,
  hotelImageUrl,
  badge,
  roomName,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  nights,
}: CheckoutSummaryProps) {
  return (
    <Box className={styles.card}>
      <Typography className={styles.sectionTitle}>Booking Summary</Typography>

      <Box className={styles.hotelRow}>
        <Box className={styles.imageWrapper}>
          <Image
            src={hotelImageUrl}
            alt={hotelName}
            fill
            className={styles.image}
          />
        </Box>
        <Box className={styles.hotelInfo}>
          <Box className={styles.nameRow}>
            <Typography className={styles.hotelName}>{hotelName}</Typography>
            {badge && (
              <Chip
                label={badge}
                size="small"
                className={`${styles.badge} ${styles[`badge${badge}`]}`}
              />
            )}
          </Box>
          <Typography className={styles.roomName}>{roomName}</Typography>
        </Box>
      </Box>

      <Box className={styles.dateRow}>
        <CalendarTodayIcon className={styles.dateIcon} />
        <Typography className={styles.dateText}>
          {formatDisplayDate(checkIn)}
        </Typography>
        <Typography className={styles.dateSeparator}>→</Typography>
        <Typography className={styles.dateText}>
          {formatDisplayDate(checkOut)}
        </Typography>
        <Typography className={styles.nightsBadge}>
          {nights} night{nights > 1 ? 's' : ''}
        </Typography>
      </Box>

      <Box className={styles.guestRow}>
        <PersonOutlineIcon className={styles.guestIcon} />
        <Typography className={styles.guestText}>
          {guestLabel(adults, childrenCount)}
        </Typography>
      </Box>
    </Box>
  );
}
