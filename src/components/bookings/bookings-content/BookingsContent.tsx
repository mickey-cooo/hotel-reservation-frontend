'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Divider, Tab, Tabs, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import StatusBadge from '@/components/ui/status-badge/StatusBadge';
import styles from './BookingsContent.module.scss';

type TabId = 'upcoming' | 'past' | 'cancelled';

const TABS: { id: TabId; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
];

type BookingStatus = 'CONFIRMED' | 'ACTION_REQUIRED';
type SecondaryAction = 'DOWNLOAD_INVOICE' | 'GET_SUPPORT' | 'CHAT_WITH_CONCIERGE';

interface Booking {
  id: string;
  status: BookingStatus;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  totalPrice: number;
  imageUrl: string;
  actionNotice?: string;
  secondaryAction: SecondaryAction;
  detailHref?: string;
}

const SECONDARY_ACTION_CONFIG: Record<
  SecondaryAction,
  { label: string; Icon: React.ElementType; href?: string }
> = {
  DOWNLOAD_INVOICE: { label: 'Download Invoice', Icon: DownloadOutlinedIcon },
  GET_SUPPORT: { label: 'Get Support', Icon: HelpOutlineIcon, href: '/concierge' },
  CHAT_WITH_CONCIERGE: { label: 'Chat with Concierge', Icon: ChatOutlinedIcon, href: '/concierge' },
};

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
          bookings.map((booking) => {
            const {
              id,
              status,
              hotelName,
              location,
              checkIn,
              checkOut,
              guests,
              totalPrice,
              imageUrl,
              actionNotice,
              secondaryAction,
              detailHref,
            } = booking;

            const { label: secondaryLabel, Icon: SecondaryIcon, href: secondaryHref } =
              SECONDARY_ACTION_CONFIG[secondaryAction];

            const isActionRequired = status === 'ACTION_REQUIRED';

            return (
              <Box key={id} className={styles.card}>
                <Box className={styles.imageSection}>
                  <Box
                    component="img"
                    src={imageUrl}
                    alt={hotelName}
                    className={styles.image}
                  />
                  <StatusBadge
                    label={isActionRequired ? 'ACTION REQUIRED' : 'CONFIRMED'}
                    background={isActionRequired ? '#F97316' : 'var(--color-gold)'}
                    color={isActionRequired ? '#fff' : 'var(--color-fg)'}
                    className={styles.badge}
                  />
                </Box>

                <Box className={styles.content}>
                  <Box className={styles.topRow}>
                    <Box className={styles.nameBlock}>
                      <Typography className={styles.hotelName}>{hotelName}</Typography>
                      <Box className={styles.locationRow}>
                        <LocationOnOutlinedIcon fontSize="small" className={styles.locationIcon} />
                        <Typography className={styles.location}>{location}</Typography>
                      </Box>
                    </Box>
                    <Box className={styles.priceBlock}>
                      <Typography className={styles.priceLabel}>TOTAL PRICE</Typography>
                      <Typography className={styles.price}>
                        ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={styles.datesRow}>
                    {[
                      { label: 'CHECK-IN', value: checkIn },
                      { label: 'CHECK-OUT', value: checkOut },
                      { label: 'GUESTS', value: guests },
                    ].map(({ label, value }) => (
                      <Box key={label} className={styles.dateField}>
                        <Typography className={styles.dateLabel}>{label}</Typography>
                        <Typography className={styles.dateValue}>{value}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {actionNotice && (
                    <Box className={styles.actionNotice}>
                      <InfoOutlinedIcon fontSize="small" className={styles.noticeIcon} />
                      <Typography className={styles.noticeText}>{actionNotice}</Typography>
                    </Box>
                  )}

                  <Box className={styles.actionsRow}>
                    <Button
                      variant="contained"
                      className={`${styles.primaryBtn}${isActionRequired ? ` ${styles.primaryBtnGold}` : ''}`}
                      {...(detailHref ? { component: Link, href: detailHref } : {})}
                    >
                      {isActionRequired ? 'Provide Details' : 'View Details'}
                    </Button>
                    <Button variant="outlined" className={styles.manageBtn}>
                      Manage
                    </Button>
                    <Box className={styles.spacer} />
                    <Button
                      className={styles.secondaryActionBtn}
                      startIcon={<SecondaryIcon fontSize="small" />}
                      {...(secondaryHref ? { component: Link, href: secondaryHref } : {})}
                    >
                      {secondaryLabel}
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
