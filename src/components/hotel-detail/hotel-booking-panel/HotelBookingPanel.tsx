'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Popover,
  Select,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import Rating from '@/components/ui/rating/Rating';
import type { Room } from '@/models/entity/hotel-room/hotel-room.model';
import styles from './HotelBookingPanel.module.scss';

interface HotelBookingPanelProps {
  rooms: Room[];
  rating: number;
  hotelId: string;
}

export default function HotelBookingPanel({
  rooms,
  rating,
  hotelId,
}: HotelBookingPanelProps) {
  const router = useRouter();
  const { t } = useTranslation('hotelDetail');
  const searchParams = useSearchParams();
  const preselectedRoomId = searchParams.get('roomId');

  const [roomId, setRoomId] = useState<string>(
    (preselectedRoomId && rooms.some((r) => r.id === preselectedRoomId)
      ? preselectedRoomId
      : rooms[0]?.id) ?? '',
  );
  const [checkIn, setCheckIn] = useState<Dayjs>(dayjs().add(7, 'day'));
  const [checkOut, setCheckOut] = useState<Dayjs>(dayjs().add(10, 'day'));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkInAnchor, setCheckInAnchor] = useState<HTMLElement | null>(null);
  const [checkOutAnchor, setCheckOutAnchor] = useState<HTMLElement | null>(null);

  const selectedRoom = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const price = selectedRoom?.price ?? 0;

  const nights = Math.max(1, checkOut.diff(checkIn, 'day'));
  const subtotal = price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  function handleCheckInSelect(date: Dayjs | null) {
    if (!date) return;
    setCheckIn(date);
    if (!checkOut.isAfter(date)) {
      setCheckOut(date.add(1, 'day'));
    }
    setCheckInAnchor(null);
  }

  function handleCheckOutSelect(date: Dayjs | null) {
    if (!date) return;
    setCheckOut(date);
    setCheckOutAnchor(null);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className={styles.panel}>
        <Box className={styles.priceHeader}>
          <Box className={styles.priceRow}>
            <Typography className={styles.price}>
              ฿{price.toLocaleString()}
            </Typography>
            <Typography className={styles.perNight}>&nbsp;{t('booking.perNight')}</Typography>
          </Box>
          <Rating
            value={rating}
            className={styles.ratingRow}
            iconClassName={styles.starIcon}
            textClassName={styles.ratingText}
          />
        </Box>

        <Select
          fullWidth
          size="small"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className={styles.roomSelect}
        >
          {rooms.map((room) => (
            <MenuItem key={room.id} value={room.id}>
              {room.name} — ฿{room.price.toLocaleString()}
              {t('booking.perNight')}
            </MenuItem>
          ))}
        </Select>

        <Box className={styles.dateGrid}>
          <Box
            className={styles.dateField}
            onClick={(e) => setCheckInAnchor(e.currentTarget)}
          >
            <Typography className={styles.fieldLabel}>{t('booking.checkIn')}</Typography>
            <Typography className={styles.dateDisplay}>
              {checkIn.format('D MMM YYYY')}
            </Typography>
          </Box>
          <Box className={styles.dateDivider} />
          <Box
            className={styles.dateField}
            onClick={(e) => setCheckOutAnchor(e.currentTarget)}
          >
            <Typography className={styles.fieldLabel}>{t('booking.checkOut')}</Typography>
            <Typography className={styles.dateDisplay}>
              {checkOut.format('D MMM YYYY')}
            </Typography>
          </Box>
        </Box>

        {/* Check-in calendar popover */}
        <Popover
          open={Boolean(checkInAnchor)}
          anchorEl={checkInAnchor}
          onClose={() => setCheckInAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{ paper: { className: styles.calendarPopoverPaper } }}
        >
          <Box className={styles.calendarPopoverHeader}>
            <Typography className={styles.calendarPopoverLabel}>
              {t('booking.selectCheckIn')}
            </Typography>
          </Box>
          <DateCalendar
            value={checkIn}
            onChange={handleCheckInSelect}
            minDate={dayjs()}
            disablePast
            className={styles.calendar}
          />
        </Popover>

        {/* Check-out calendar popover */}
        <Popover
          open={Boolean(checkOutAnchor)}
          anchorEl={checkOutAnchor}
          onClose={() => setCheckOutAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{ paper: { className: styles.calendarPopoverPaper } }}
        >
          <Box className={styles.calendarPopoverHeader}>
            <Typography className={styles.calendarPopoverLabel}>
              {t('booking.selectCheckOut')}
            </Typography>
          </Box>
          <DateCalendar
            value={checkOut}
            onChange={handleCheckOutSelect}
            minDate={checkIn.add(1, 'day')}
            className={styles.calendar}
          />
        </Popover>

        <Box className={styles.guestField}>
          <Typography className={styles.fieldLabel}>{t('booking.guests')}</Typography>
          <Box className={styles.guestControls}>
            <Box className={styles.guestItem}>
              <Typography className={styles.guestType}>{t('booking.adults')}</Typography>
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
              <Typography className={styles.guestType}>{t('booking.children')}</Typography>
              <Box className={styles.counter}>
                <IconButton
                  size="small"
                  className={styles.counterBtn}
                  onClick={() => setChildren((v) => Math.max(0, v - 1))}
                  disabled={children <= 0}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography className={styles.counterVal}>
                  {children}
                </Typography>
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
          disabled={!roomId}
          onClick={() =>
            router.push(
              `/checkout?hotelId=${hotelId}&roomId=${roomId}&checkIn=${checkIn.format('YYYY-MM-DD')}&checkOut=${checkOut.format('YYYY-MM-DD')}&adults=${adults}&children=${children}`,
            )
          }
        >
          {t('booking.bookNow')}
        </Button>

        <Divider className={styles.divider} />

        <Box className={styles.breakdown}>
          <Box className={styles.breakdownRow}>
            <Typography className={styles.breakdownLabel}>
              {t(nights > 1 ? 'booking.nightsBreakdownPlural' : 'booking.nightsBreakdown', {
                price: price.toLocaleString(),
                nights,
              })}
            </Typography>
            <Typography className={styles.breakdownValue}>
              ฿{subtotal.toLocaleString()}
            </Typography>
          </Box>
          <Box className={styles.breakdownRow}>
            <Typography className={styles.breakdownLabel}>
              {t('booking.serviceFee')}
            </Typography>
            <Typography className={styles.breakdownValue}>
              ฿{serviceFee.toLocaleString()}
            </Typography>
          </Box>
          <Box className={`${styles.breakdownRow} ${styles.totalRow}`}>
            <Typography className={styles.totalLabel}>{t('booking.total')}</Typography>
            <Typography className={styles.totalValue}>
              ฿{total.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box className={styles.freeCancelRow}>
          <VerifiedUserOutlinedIcon className={styles.shieldIcon} />
          <Typography className={styles.freeCancelText}>
            {t('booking.freeCancellation')}
          </Typography>
        </Box>

        <Divider className={styles.divider} />

        <Box className={styles.whySection}>
          <Box className={styles.whyHeader}>
            <InfoOutlinedIcon className={styles.infoIcon} />
            <Link
              href="/why-lumina"
              underline="none"
              className={styles.whyLink}
            >
              {t('booking.whyBookWith')}
            </Link>
          </Box>
          <Typography className={styles.whyDesc}>
            {t('booking.whyBookDesc')}
          </Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
