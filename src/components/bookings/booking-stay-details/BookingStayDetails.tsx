import { Box, Divider, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
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

function guestLabel(adults: number, children: number): string {
  const parts = [`${adults} Adult${adults > 1 ? 's' : ''}`];
  if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
  return parts.join(', ');
}

export default function BookingStayDetails({ checkIn, checkOut, adults, childrenCount }: BookingStayDetailsProps) {
  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <CalendarTodayOutlinedIcon className={styles.headerIcon} />
        <Typography className={styles.headerTitle}>Stay Details</Typography>
      </Box>

      <Box className={styles.datesGrid}>
        <Box className={styles.dateField}>
          <Typography className={styles.dateLabel}>Check-In</Typography>
          <Typography className={styles.dateValue}>{formatDate(checkIn)}</Typography>
          <Typography className={styles.dateNote}>After 14:00</Typography>
        </Box>
        <Box className={styles.dateField}>
          <Typography className={styles.dateLabel}>Check-Out</Typography>
          <Typography className={styles.dateValue}>{formatDate(checkOut)}</Typography>
          <Typography className={styles.dateNote}>Before 12:00</Typography>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.guestsRow}>
        <PersonOutlinedIcon className={styles.guestsIcon} />
        <Box>
          <Typography className={styles.guestsLabel}>Guests</Typography>
          <Typography className={styles.guestsValue}>{guestLabel(adults, childrenCount)}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
