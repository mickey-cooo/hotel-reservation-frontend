'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckoutSummary from '@/components/checkout/checkout-summary/CheckoutSummary';
import BillingForm, { BillingValues } from '@/components/checkout/billing-form/BillingForm';
import PaymentMethod, { PaymentMethodType } from '@/components/checkout/payment-method/PaymentMethod';
import PricePanel from '@/components/checkout/price-panel/PricePanel';
import type { HotelDetail } from '@/lib/hotel-data';
import styles from './CheckoutContent.module.scss';

interface CheckoutContentProps {
  hotel: HotelDetail;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
}

const EMPTY_BILLING: BillingValues = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
};

export default function CheckoutContent({
  hotel,
  checkIn,
  checkOut,
  adults,
  children,
  nights,
}: CheckoutContentProps) {
  const router = useRouter();
  const [billing, setBilling] = useState<BillingValues>(EMPTY_BILLING);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');

  function handlePay() {
    const bookingRef = `LS-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const params = new URLSearchParams({
      hotelId: hotel.id,
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
      firstName: billing.firstName,
      lastName: billing.lastName,
      email: billing.email,
      address: billing.address,
      roomName,
    });
    router.push(`/bookings/${bookingRef}?${params.toString()}`);
  }

  const roomName = hotel.rooms[0]?.name ?? 'Standard Room';

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
            roomName={roomName}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            children={children}
            nights={nights}
          />
          <BillingForm values={billing} onChange={setBilling} />
          <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
        </Box>

        <Box className={styles.rightCol}>
          <PricePanel
            pricePerNight={hotel.price}
            nights={nights}
            onPay={handlePay}
          />
        </Box>
      </Box>
    </Box>
  );
}
