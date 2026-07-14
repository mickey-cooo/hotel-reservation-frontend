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

// The backend's GET /hotel-booking/list requires a specific hotel_id — there
// is no "all my bookings across hotels" endpoint yet, so this list can't be
// wired to real data until that endpoint exists.
const BOOKINGS_BY_TAB: Record<TabId, Booking[]> = {
  upcoming: [],
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
