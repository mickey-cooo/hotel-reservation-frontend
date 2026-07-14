import { Box, Button, Divider, Typography } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + tax - LUMINA_DISCOUNT;

  return (
    <Box className={styles.panel}>
      <Typography className={styles.panelTitle}>Cost Details</Typography>

      <Box className={styles.breakdown}>
        <Box className={styles.row}>
          <Typography className={styles.label}>
            ฿{pricePerNight.toLocaleString()} × {nights} night
            {nights > 1 ? 's' : ''}
          </Typography>
          <Typography className={styles.value}>
            ฿{subtotal.toLocaleString()}
          </Typography>
        </Box>

        <Box className={styles.row}>
          <Typography className={styles.label}>Tax &amp; fees (7%)</Typography>
          <Typography className={styles.value}>฿{tax.toLocaleString()}</Typography>
        </Box>

        <Box className={styles.row}>
          <Typography className={styles.label}>Lumina member discount</Typography>
          <Typography className={styles.discount}>
            −฿{LUMINA_DISCOUNT.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.totalRow}>
        <Box>
          <Typography className={styles.totalLabel}>Total</Typography>
          <Typography className={styles.currency}>THB</Typography>
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
        Pay Now
      </Button>

      <Box className={styles.secureRow}>
        <VerifiedUserOutlinedIcon className={styles.shieldIcon} />
        <Typography className={styles.secureText}>
          Payment Protection — your card is charged only after your booking is
          confirmed. We never store your card data.
        </Typography>
      </Box>
    </Box>
  );
}
