import { Box, Typography } from '@mui/material';
import styles from './PriceRow.module.scss';

interface PriceRowProps {
  amount: number;
  currency?: string;
  unit?: string;
  className?: string;
  amountClassName?: string;
  unitClassName?: string;
}

export default function PriceRow({
  amount,
  currency = '$',
  unit = '/night',
  className,
  amountClassName,
  unitClassName,
}: PriceRowProps) {
  return (
    <Box className={`${styles.row}${className ? ` ${className}` : ''}`}>
      <Typography className={`${styles.amount}${amountClassName ? ` ${amountClassName}` : ''}`}>
        {currency}
        {amount.toLocaleString()}
      </Typography>
      <Typography className={`${styles.unit}${unitClassName ? ` ${unitClassName}` : ''}`}>
        {unit}
      </Typography>
    </Box>
  );
}
