'use client';

import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import StatusBadge from '@/components/ui/status-badge/StatusBadge';
import styles from './CheckoutSummary.module.scss';

type Badge = 'TRENDING' | 'FEATURED' | 'EXCLUSIVE';

const BADGE_CONFIG: Record<Badge, { background: string; color: string }> = {
  TRENDING: { background: '#fef3c7', color: '#92400e' },
  FEATURED: { background: '#ede9fe', color: '#5b21b6' },
  EXCLUSIVE: { background: 'var(--color-fg)', color: 'var(--color-gold)' },
};

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

function guestLabel(t: TFunction, adults: number, children: number): string {
  const parts: string[] = [
    `${adults} ${adults > 1 ? t('summary.adultsPlural') : t('summary.adult')}`,
  ];
  if (children > 0) {
    parts.push(`${children} ${children > 1 ? t('summary.childrenPlural') : t('summary.child')}`);
  }
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
  const { t } = useTranslation('checkout');

  return (
    <Box className={styles.card}>
      <Typography className={styles.sectionTitle}>{t('summary.bookingSummary')}</Typography>

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
              <StatusBadge
                label={badge}
                background={BADGE_CONFIG[badge].background}
                color={BADGE_CONFIG[badge].color}
                className={styles.badge}
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
          {nights} {nights > 1 ? t('summary.nightsPlural') : t('summary.night')}
        </Typography>
      </Box>

      <Box className={styles.guestRow}>
        <PersonOutlineIcon className={styles.guestIcon} />
        <Typography className={styles.guestText}>
          {guestLabel(t, adults, childrenCount)}
        </Typography>
      </Box>
    </Box>
  );
}
