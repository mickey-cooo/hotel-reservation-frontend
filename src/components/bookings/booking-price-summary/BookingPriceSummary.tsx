'use client';

import { Box, Button, Divider, Typography } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Link from 'next/link';
import styles from './BookingPriceSummary.module.scss';

const LUMINA_DISCOUNT = 2000;

interface BookingPriceSummaryProps {
  roomName: string;
  pricePerNight: number;
  nights: number;
}

export default function BookingPriceSummary({ roomName, pricePerNight, nights }: BookingPriceSummaryProps) {
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * 0.07);
  const discount = Math.min(LUMINA_DISCOUNT, Math.round(subtotal * 0.05));
  const total = subtotal + tax - discount;

  return (
    <Box className={styles.panel}>
      <Typography className={styles.panelTitle}>Price Summary</Typography>

      <Box className={styles.breakdown}>
        <Box className={styles.row}>
          <Typography className={styles.label}>
            {roomName} ({nights} night{nights > 1 ? 's' : ''})
          </Typography>
          <Typography className={styles.value}>฿{subtotal.toLocaleString()}</Typography>
        </Box>
        <Box className={styles.row}>
          <Typography className={styles.label}>Tax &amp; fees (7%)</Typography>
          <Typography className={styles.value}>฿{tax.toLocaleString()}</Typography>
        </Box>
        <Box className={styles.row}>
          <Typography className={styles.label}>Lumina member discount</Typography>
          <Typography className={styles.discount}>−฿{discount.toLocaleString()}</Typography>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.totalRow}>
        <Box>
          <Typography className={styles.totalLabel}>Net Total</Typography>
          <Typography className={styles.totalCurrency}>THB</Typography>
        </Box>
        <Typography className={styles.totalValue}>฿{total.toLocaleString()}</Typography>
      </Box>

      <Box className={styles.actions}>
        <Button
          component={Link}
          href="/bookings"
          variant="contained"
          fullWidth
          startIcon={<CheckOutlinedIcon />}
          className={styles.manageBtn}
        >
          Manage Booking
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PrintOutlinedIcon />}
          className={styles.outlinedBtn}
          onClick={() => window.print()}
        >
          Print Receipt
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<MailOutlinedIcon />}
          className={styles.outlinedBtn}
        >
          Contact Hotel
        </Button>
      </Box>

      <Box className={styles.concierge}>
        <Box className={styles.conciergeIconWrapper}>
          <SupportAgentIcon className={styles.conciergeIcon} />
        </Box>
        <Box>
          <Typography className={styles.conciergeTitle}>24/7 Concierge Service</Typography>
          <Typography className={styles.conciergeText}>We are ready to assist you at any time</Typography>
        </Box>
      </Box>
    </Box>
  );
}
