'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckoutSummary from '@/components/checkout/checkout-summary/CheckoutSummary';
import BillingForm, { BillingValues } from '@/components/checkout/billing-form/BillingForm';
import PaymentMethod, { PaymentMethodType } from '@/components/checkout/payment-method/PaymentMethod';
import PricePanel from '@/components/checkout/price-panel/PricePanel';
import type { HotelDetail, Room } from '@/lib/hotel-data';
import { createBookingAction } from '@/service/hotel-booking/booking-actions';
import styles from './CheckoutContent.module.scss';

interface CheckoutContentProps {
  hotel: HotelDetail;
  room: Room;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  nights: number;
}

const EMPTY_BILLING: BillingValues = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
};

// Backend PaymentMethod enum has no direct "wallet" concept; map the closest
// available option (see backend/src/enum/common.status.ts).
const PAYMENT_METHOD_MAP: Record<PaymentMethodType, string> = {
  card: 'credit_card',
  wallet: 'paypal',
  bank: 'bank_transfer',
};

export default function CheckoutContent({
  hotel,
  room,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  nights,
}: CheckoutContentProps) {
  const router = useRouter();
  const [billing, setBilling] = useState<BillingValues>(EMPTY_BILLING);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await createBookingAction({
        hotel_id: hotel.id,
        room_id: room.id,
        guestCount: adults + childrenCount,
        stayPeriod: nights,
        paymentMethod: PAYMENT_METHOD_MAP[paymentMethod],
        checkInDate: checkIn,
        checkOutDate: checkOut,
      });

      if (!result.ok) {
        throw new Error(result.message ?? 'Booking failed');
      }

      // Unverified: backend returns the raw insert row, whose key casing
      // (bookingCode vs booking_code) depends on TypeORM driver behavior we
      // couldn't confirm without a live booking test.
      const bookingCode = result.bookingCode as string;
      const params = new URLSearchParams({
        hotelId: hotel.id,
        roomId: room.id,
        checkIn,
        checkOut,
        adults: String(adults),
        children: String(childrenCount),
        firstName: billing.firstName,
        lastName: billing.lastName,
        email: billing.email,
        address: billing.address,
        roomName: room.name,
      });
      router.push(`/bookings/${bookingCode}?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.pageHeader}>
        <Typography className={styles.pageTitle}>Checkout</Typography>
        <Box className={styles.secureTag}>
          <LockOutlinedIcon className={styles.lockIcon} />
          <Typography className={styles.secureLabel}>Secure Payment</Typography>
        </Box>
      </Box>

      <Box className={styles.grid}>
        <Box className={styles.leftCol}>
          <CheckoutSummary
            hotelName={hotel.name}
            hotelImageUrl={hotel.imageUrl}
            badge={hotel.badge}
            roomName={room.name}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            childrenCount={childrenCount}
            nights={nights}
          />
          <BillingForm values={billing} onChange={setBilling} />
          <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
          {error && <Typography color="error">{error}</Typography>}
        </Box>

        <Box className={styles.rightCol}>
          <PricePanel
            pricePerNight={room.price}
            nights={nights}
            onPay={handlePay}
            disabled={isSubmitting}
          />
        </Box>
      </Box>
    </Box>
  );
}
