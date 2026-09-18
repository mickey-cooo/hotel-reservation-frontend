'use client';

import { Box, Typography } from '@mui/material';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import styles from './BookingCancellationPolicy.module.scss';

interface BookingCancellationPolicyProps {
  checkIn: string;
}

function freeCancelDeadline(checkIn: string): string {
  const d = new Date(checkIn + 'T00:00:00');
  d.setDate(d.getDate() - 2);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BookingCancellationPolicy({ checkIn }: BookingCancellationPolicyProps) {
  const { t } = useTranslation('bookings');
  const deadline = freeCancelDeadline(checkIn);

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <GppGoodOutlinedIcon className={styles.headerIcon} />
        <Typography className={styles.headerTitle}>{t('cancellationPolicy.title')}</Typography>
      </Box>

      <Typography className={styles.freeLabel}>{t('cancellationPolicy.freeLabel')}</Typography>
      <Typography className={styles.policyText}>
        {t('cancellationPolicy.policyText', { deadline })}
      </Typography>

      <Box className={styles.readMoreLink}>
        <Typography className={styles.readMoreText}>{t('cancellationPolicy.readMore')}</Typography>
        <ChevronRightIcon className={styles.readMoreIcon} />
      </Box>
    </Box>
  );
}
