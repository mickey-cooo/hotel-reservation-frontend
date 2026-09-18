'use client';

import { Box, Button, Divider, Typography } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import styles from './PricePanel.module.scss';

const LUMINA_DISCOUNT = 2000;

interface PricePanelProps {
  pricePerNight: number;
  nights: number;
  onPay: () => void;
  disabled?: boolean;
}

export default function PricePanel({
  pricePerNight,
  nights,
  onPay,
  disabled,
}: PricePanelProps) {
  const { t } = useTranslation('checkout');
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + tax - LUMINA_DISCOUNT;

  return (
    <Box className={styles.panel}>
      <Typography className={styles.panelTitle}>{t('price.title')}</Typography>

      <Box className={styles.breakdown}>
        <Box className={styles.row}>
          <Typography className={styles.label}>
            ฿{pricePerNight.toLocaleString()} × {nights}{' '}
            {nights > 1 ? t('price.nightsPlural') : t('price.night')}
          </Typography>
          <Typography className={styles.value}>
            ฿{subtotal.toLocaleString()}
          </Typography>
        </Box>

        <Box className={styles.row}>
          <Typography className={styles.label}>{t('price.taxAndFees')}</Typography>
          <Typography className={styles.value}>฿{tax.toLocaleString()}</Typography>
        </Box>

        <Box className={styles.row}>
          <Typography className={styles.label}>{t('price.memberDiscount')}</Typography>
          <Typography className={styles.discount}>
            −฿{LUMINA_DISCOUNT.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.totalRow}>
        <Box>
          <Typography className={styles.totalLabel}>{t('price.total')}</Typography>
          <Typography className={styles.currency}>{t('price.currency')}</Typography>
        </Box>
        <Typography className={styles.totalValue}>
          ฿{total.toLocaleString()}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        endIcon={<ArrowForwardIcon />}
        className={styles.payBtn}
        onClick={onPay}
        disabled={disabled}
      >
        {t('price.payNow')}
      </Button>

      <Box className={styles.secureRow}>
        <VerifiedUserOutlinedIcon className={styles.shieldIcon} />
        <Typography className={styles.secureText}>
          {t('price.protectionText')}
        </Typography>
      </Box>
    </Box>
  );
}
