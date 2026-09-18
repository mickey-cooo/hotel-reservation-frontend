'use client';

import { Box, Button, Divider, Typography } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './BookingPriceSummary.module.scss';

const LUMINA_DISCOUNT = 2000;

interface BookingPriceSummaryProps {
  roomName: string;
  pricePerNight: number;
  nights: number;
}

export default function BookingPriceSummary({ roomName, pricePerNight, nights }: BookingPriceSummaryProps) {
  const { t } = useTranslation('bookings');
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * 0.07);
  const discount = Math.min(LUMINA_DISCOUNT, Math.round(subtotal * 0.05));
  const total = subtotal + tax - discount;

  return (
    <Box className={styles.panel}>
      <Typography className={styles.panelTitle}>{t('priceSummary.title')}</Typography>

      <Box className={styles.breakdown}>
        <Box className={styles.row}>
          <Typography className={styles.label}>
            {roomName} ({nights} {nights > 1 ? t('priceSummary.nightsPlural') : t('priceSummary.night')})
          </Typography>
          <Typography className={styles.value}>฿{subtotal.toLocaleString()}</Typography>
        </Box>
        <Box className={styles.row}>
          <Typography className={styles.label}>{t('priceSummary.taxAndFees')}</Typography>
          <Typography className={styles.value}>฿{tax.toLocaleString()}</Typography>
        </Box>
        <Box className={styles.row}>
          <Typography className={styles.label}>{t('priceSummary.memberDiscount')}</Typography>
          <Typography className={styles.discount}>−฿{discount.toLocaleString()}</Typography>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.totalRow}>
        <Box>
          <Typography className={styles.totalLabel}>{t('priceSummary.netTotal')}</Typography>
          <Typography className={styles.totalCurrency}>{t('priceSummary.currency')}</Typography>
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
          {t('priceSummary.manageBooking')}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PrintOutlinedIcon />}
          className={styles.outlinedBtn}
          onClick={() => window.print()}
        >
          {t('priceSummary.printReceipt')}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<MailOutlinedIcon />}
          className={styles.outlinedBtn}
        >
          {t('priceSummary.contactHotel')}
        </Button>
      </Box>

      <Box className={styles.concierge}>
        <Box className={styles.conciergeIconWrapper}>
          <SupportAgentIcon className={styles.conciergeIcon} />
        </Box>
        <Box>
          <Typography className={styles.conciergeTitle}>{t('priceSummary.conciergeTitle')}</Typography>
          <Typography className={styles.conciergeText}>{t('priceSummary.conciergeText')}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
