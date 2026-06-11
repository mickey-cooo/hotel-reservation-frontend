import { Box, Typography } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import styles from './BookingGuestInfo.module.scss';

interface BookingGuestInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

export default function BookingGuestInfo({ firstName, lastName, email, address }: BookingGuestInfoProps) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—';
  const displayEmail = email || '—';
  const displayAddress = address || '—';

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <PersonOutlinedIcon className={styles.headerIcon} />
        <Typography className={styles.headerTitle}>Guest Information</Typography>
      </Box>

      <Box className={styles.grid}>
        <Box className={styles.field}>
          <Typography className={styles.fieldLabel}>Primary Contact</Typography>
          <Typography className={styles.fieldValue}>{fullName}</Typography>
        </Box>
        <Box className={styles.field}>
          <Typography className={styles.fieldLabel}>Email</Typography>
          <Typography className={styles.fieldValue}>{displayEmail}</Typography>
        </Box>
        <Box className={styles.field}>
          <Typography className={styles.fieldLabel}>Address</Typography>
          <Typography className={styles.fieldValue}>{displayAddress}</Typography>
        </Box>
        <Box className={styles.field}>
          <Typography className={styles.fieldLabel}>Special Requests</Typography>
          <Typography className={styles.fieldValue}>—</Typography>
        </Box>
      </Box>
    </Box>
  );
}
