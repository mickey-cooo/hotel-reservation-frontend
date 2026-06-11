'use client';

import { Box, Radio, TextField, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import styles from './PaymentMethod.module.scss';

export type PaymentMethodType = 'card' | 'wallet' | 'bank';

interface PaymentMethodProps {
  value: PaymentMethodType;
  onChange: (v: PaymentMethodType) => void;
}

const METHODS: {
  id: PaymentMethodType;
  label: string;
  subLabel?: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: <CreditCardIcon />,
  },
  {
    id: 'wallet',
    label: 'Digital Wallet',
    subLabel: 'Apple Pay, Google Pay',
    icon: <PhoneIphoneIcon />,
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    icon: <AccountBalanceIcon />,
  },
];

export default function PaymentMethod({ value, onChange }: PaymentMethodProps) {
  return (
    <Box className={styles.card}>
      <Typography className={styles.sectionTitle}>Payment Method</Typography>

      <Box className={styles.methodList}>
        {METHODS.map((method) => {
          const isSelected = value === method.id;
          return (
            <Box key={method.id}>
              <Box
                className={`${styles.methodRow}${isSelected ? ` ${styles.methodRowSelected}` : ''}`}
                onClick={() => onChange(method.id)}
              >
                <Radio
                  checked={isSelected}
                  onChange={() => onChange(method.id)}
                  className={styles.radio}
                  size="small"
                />
                <Box className={styles.methodLabel}>
                  <Typography className={styles.methodName}>
                    {method.label}
                  </Typography>
                  {method.subLabel && (
                    <Typography className={styles.methodSub}>
                      {method.subLabel}
                    </Typography>
                  )}
                </Box>
                <Box className={styles.methodIcon}>{method.icon}</Box>
              </Box>

              {isSelected && method.id === 'card' && (
                <Box className={styles.cardFields}>
                  <TextField
                    placeholder="0000 0000 0000 0000"
                    fullWidth
                    className={styles.field}
                    slotProps={{
                      input: {
                        className: styles.input,
                        endAdornment: (
                          <CreditCardIcon className={styles.cardEndIcon} />
                        ),
                      },
                    }}
                  />
                  <Box className={styles.cardRow}>
                    <TextField
                      placeholder="MM / YY"
                      label="Expiry"
                      className={styles.field}
                      slotProps={{ inputLabel: { className: styles.fieldLabel }, input: { className: styles.input } }}
                    />
                    <TextField
                      placeholder="•••"
                      label="CVC / CVV"
                      className={styles.field}
                      slotProps={{ inputLabel: { className: styles.fieldLabel }, input: { className: styles.input } }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
