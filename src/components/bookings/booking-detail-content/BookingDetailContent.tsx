import { Box, Typography } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import BookingHotelCard from '@/components/bookings/booking-hotel-card/BookingHotelCard';
import BookingStayDetails from '@/components/bookings/booking-stay-details/BookingStayDetails';
import BookingCancellationPolicy from '@/components/bookings/booking-cancellation-policy/BookingCancellationPolicy';
import BookingGuestInfo from '@/components/bookings/booking-guest-info/BookingGuestInfo';
import BookingPriceSummary from '@/components/bookings/booking-price-summary/BookingPriceSummary';
import type { HotelDetail } from '@/lib/hotel-data';
import styles from './BookingDetailContent.module.scss';

interface BookingDetailContentProps {
  bookingRef: string;
  hotel: HotelDetail;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestAddress: string;
  roomName: string;
}

export default function BookingDetailContent({
  bookingRef,
  hotel,
  checkIn,
  checkOut,
  adults,
  children,
  nights,
  guestFirstName,
  guestLastName,
  guestEmail,
  guestAddress,
  roomName,
}: BookingDetailContentProps) {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.pageHeader}>
        <Box className={styles.titleBlock}>
          <Breadcrumb items={[{ label: 'My Bookings', href: '/bookings' }, { label: 'Details' }]} />
          <Typography className={styles.pageTitle}>Booking Details</Typography>
          <Typography className={styles.bookingRef}>Booking reference: #{bookingRef}</Typography>
        </Box>
        <Box className={styles.confirmedBadge}>
          <CheckCircleOutlinedIcon className={styles.confirmedIcon} />
          <Typography className={styles.confirmedText}>Booking confirmed</Typography>
        </Box>
      </Box>

      <Box className={styles.grid}>
        <Box className={styles.leftCol}>
          <BookingHotelCard hotel={hotel} roomName={roomName} />

          <Box className={styles.twoCol}>
            <BookingStayDetails checkIn={checkIn} checkOut={checkOut} adults={adults} children={children} />
            <BookingCancellationPolicy checkIn={checkIn} />
          </Box>

          <BookingGuestInfo
            firstName={guestFirstName}
            lastName={guestLastName}
            email={guestEmail}
            address={guestAddress}
          />
        </Box>

        <Box className={styles.rightCol}>
          <BookingPriceSummary roomName={roomName} pricePerNight={hotel.price} nights={nights} />
        </Box>
      </Box>
    </Box>
  );
}
