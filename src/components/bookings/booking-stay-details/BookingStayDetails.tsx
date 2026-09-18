'use client';

import { Box, Divider, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import styles from './BookingStayDetails.module.scss';

interface BookingStayDetailsProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function guestLabel(t: TFunction, adults: number, children: number): string {
  const parts = [
    `${adults} ${adults > 1 ? t('stayDetails.adultsPlural') : t('stayDetails.adult')}`,
  ];
  if (children > 0) {
    parts.push(
      `${children} ${children > 1 ? t('stayDetails.childrenPlural') : t('stayDetails.child')}`,
    );
  }
  return parts.join(', ');
}

export default function BookingStayDetails({ checkIn, checkOut, adults, childrenCount }: BookingStayDetailsProps) {
  const { t } = useTranslation('bookings');

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <CalendarTodayOutlinedIcon className={styles.headerIcon} />
        <Typography className={styles.headerTitle}>{t('stayDetails.title')}</Typography>
      </Box>

      <Box className={styles.datesGrid}>
        <Box className={styles.dateField}>
          <Typography className={styles.dateLabel}>{t('stayDetails.checkIn')}</Typography>
          <Typography className={styles.dateValue}>{formatDate(checkIn)}</Typography>
          <Typography className={styles.dateNote}>{t('stayDetails.afterTime')}</Typography>
        </Box>
        <Box className={styles.dateField}>
          <Typography className={styles.dateLabel}>{t('stayDetails.checkOut')}</Typography>
          <Typography className={styles.dateValue}>{formatDate(checkOut)}</Typography>
          <Typography className={styles.dateNote}>{t('stayDetails.beforeTime')}</Typography>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.guestsRow}>
        <PersonOutlinedIcon className={styles.guestsIcon} />
        <Box>
          <Typography className={styles.guestsLabel}>{t('stayDetails.guests')}</Typography>
          <Typography className={styles.guestsValue}>{guestLabel(t, adults, childrenCount)}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
