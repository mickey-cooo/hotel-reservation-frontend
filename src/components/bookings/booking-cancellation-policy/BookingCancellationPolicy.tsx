import { Box, Typography } from '@mui/material';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  const deadline = freeCancelDeadline(checkIn);

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <GppGoodOutlinedIcon className={styles.headerIcon} />
        <Typography className={styles.headerTitle}>Cancellation Policy</Typography>
      </Box>

      <Typography className={styles.freeLabel}>Free Cancellation</Typography>
      <Typography className={styles.policyText}>
        You can cancel free of charge before {deadline} (by 23:59, local time). After that, the booking is
        non-refundable.
      </Typography>

      <Box className={styles.readMoreLink}>
        <Typography className={styles.readMoreText}>Read full terms and conditions</Typography>
        <ChevronRightIcon className={styles.readMoreIcon} />
      </Box>
    </Box>
  );
}
