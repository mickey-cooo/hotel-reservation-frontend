'use client';

import { useState } from 'react';
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import BookingCard from '@/components/bookings/booking-card/BookingCard';
import type { Booking } from '@/components/bookings/booking-card/BookingCard';
import styles from './BookingsContent.module.scss';

type TabId = 'upcoming' | 'past' | 'cancelled';

const TABS: { id: TabId; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
];

const UPCOMING_BOOKINGS: Booking[] = [
  {
    id: '1',
    status: 'CONFIRMED',
    hotelName: 'The Azure Heights',
    location: 'Santorini, Greece',
    checkIn: 'Oct 14, 2024',
    checkOut: 'Oct 19, 2024',
    guests: '2 Adults, 1 Junior Suite',
    totalPrice: 2450,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
    secondaryAction: 'DOWNLOAD_INVOICE',
  },
  {
    id: '2',
    status: 'CONFIRMED',
    hotelName: 'Lumina Grand Villa',
    location: 'Maldives, South Atoll',
    checkIn: 'Dec 22, 2024',
    checkOut: 'Dec 29, 2024',
    guests: '2 Adults, Water Villa',
    totalPrice: 5120,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
    secondaryAction: 'GET_SUPPORT',
  },
  {
    id: '3',
    status: 'ACTION_REQUIRED',
    hotelName: 'The Urban Sanctuary',
    location: 'Tokyo, Minato',
    checkIn: 'Jan 12, 2025',
    checkOut: 'Jan 15, 2025',
    guests: '1 Adult, Deluxe King',
    totalPrice: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
    actionNotice: 'Please confirm your flight details for airport transfer.',
    secondaryAction: 'CHAT_WITH_CONCIERGE',
  },
];

const BOOKINGS_BY_TAB: Record<TabId, Booking[]> = {
  upcoming: UPCOMING_BOOKINGS,
  past: [],
  cancelled: [],
};

export default function BookingsContent() {
  const [activeTab, setActiveTab] = useState<TabId>('upcoming');
  const bookings = BOOKINGS_BY_TAB[activeTab];

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_, newTab: TabId) => setActiveTab(newTab)}
        className={styles.tabs}
        slotProps={{ indicator: { className: styles.indicator } }}
      >
        {TABS.map(({ id, label }) => (
          <Tab
            key={id}
            value={id}
            label={label}
            className={styles.tab}
          />
        ))}
      </Tabs>
      <Divider className={styles.divider} />

      <Box className={styles.cardList}>
        {bookings.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography className={styles.emptyText}>No bookings found.</Typography>
          </Box>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </Box>
    </Box>
  );
}
