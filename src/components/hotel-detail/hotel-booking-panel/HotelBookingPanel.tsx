'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './HotelBookingPanel.module.scss';

interface HotelBookingPanelProps {
  price: number;
  rating: number;
  hotelName: string;
  hotelId: string;
}

function getDefaultDates() {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 7);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 3);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return { checkIn: fmt(checkIn), checkOut: fmt(checkOut) };
}

function nightsBetween(a: string, b: string): number {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function HotelBookingPanel({
  price,
  rating,
  hotelName,
  hotelId,
}: HotelBookingPanelProps) {
  const router = useRouter();
  const defaults = getDefaultDates();
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  return (
    <Box className={styles.panel}>
      <Box className={styles.priceHeader}>
        <Box className={styles.priceRow}>
          <Typography className={styles.price}>
            ฿{price.toLocaleString()}
          </Typography>
          <Typography className={styles.perNight}>&nbsp;/ night</Typography>
        </Box>
        <Box className={styles.ratingRow}>
          <StarIcon className={styles.starIcon} />
          <Typography className={styles.ratingText}>
            {rating.toFixed(1)}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.dateGrid}>
        <Box className={styles.dateField}>
          <Typography className={styles.fieldLabel}>Check-in</Typography>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className={styles.dateInput}
          />
          <Typography className={styles.dateDisplay}>
            {formatDisplayDate(checkIn)}
          </Typography>
        </Box>
        <Box className={styles.dateDivider} />
        <Box className={styles.dateField}>
          <Typography className={styles.fieldLabel}>Check-out</Typography>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className={styles.dateInput}
          />
          <Typography className={styles.dateDisplay}>
            {formatDisplayDate(checkOut)}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.guestField}>
        <Typography className={styles.fieldLabel}>Guests</Typography>
        <Box className={styles.guestControls}>
          <Box className={styles.guestItem}>
            <Typography className={styles.guestType}>Adults</Typography>
            <Box className={styles.counter}>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setAdults((v) => Math.max(1, v - 1))}
                disabled={adults <= 1}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography className={styles.counterVal}>{adults}</Typography>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setAdults((v) => Math.min(8, v + 1))}
                disabled={adults >= 8}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box className={styles.guestItem}>
            <Typography className={styles.guestType}>Children</Typography>
            <Box className={styles.counter}>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setChildren((v) => Math.max(0, v - 1))}
                disabled={children <= 0}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography className={styles.counterVal}>{children}</Typography>
              <IconButton
                size="small"
                className={styles.counterBtn}
                onClick={() => setChildren((v) => Math.min(6, v + 1))}
                disabled={children >= 6}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        className={styles.bookBtn}
        onClick={() =>
          router.push(
            `/checkout?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`,
          )
        }
      >
        Book Now
      </Button>

      <Divider className={styles.divider} />

      <Box className={styles.breakdown}>
        <Box className={styles.breakdownRow}>
          <Typography className={styles.breakdownLabel}>
            ฿{price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}
          </Typography>
          <Typography className={styles.breakdownValue}>
            ฿{subtotal.toLocaleString()}
          </Typography>
        </Box>
        <Box className={styles.breakdownRow}>
          <Typography className={styles.breakdownLabel}>Service fee</Typography>
          <Typography className={styles.breakdownValue}>
            ฿{serviceFee.toLocaleString()}
          </Typography>
        </Box>
        <Box className={`${styles.breakdownRow} ${styles.totalRow}`}>
          <Typography className={styles.totalLabel}>Total</Typography>
          <Typography className={styles.totalValue}>
            ฿{total.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.freeCancelRow}>
        <VerifiedUserOutlinedIcon className={styles.shieldIcon} />
        <Typography className={styles.freeCancelText}>
          Free cancellation available
        </Typography>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.whySection}>
        <Box className={styles.whyHeader}>
          <InfoOutlinedIcon className={styles.infoIcon} />
          <Link href="/why-lumina" underline="none" className={styles.whyLink}>
            Why book with Lumina Stay?
          </Link>
        </Box>
        <Typography className={styles.whyDesc}>
          Best rate guarantee · Secure payment · 24/7 concierge support · Earn
          Lumina Points
        </Typography>
      </Box>
    </Box>
  );
}
