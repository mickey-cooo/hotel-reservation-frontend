'use client';

import { Box, Radio, TextField, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useTranslation } from 'react-i18next';
import styles from './PaymentMethod.module.scss';

export type PaymentMethodType = 'card' | 'wallet' | 'bank';

interface PaymentMethodProps {
  value: PaymentMethodType;
  onChange: (v: PaymentMethodType) => void;
}

const METHODS: {
  id: PaymentMethodType;
  labelKey: string;
  subLabelKey?: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'card',
    labelKey: 'payment.card',
    icon: <CreditCardIcon />,
  },
  {
    id: 'wallet',
    labelKey: 'payment.wallet',
    subLabelKey: 'payment.walletSub',
    icon: <PhoneIphoneIcon />,
  },
  {
    id: 'bank',
    labelKey: 'payment.bank',
    icon: <AccountBalanceIcon />,
  },
];

export default function PaymentMethod({ value, onChange }: PaymentMethodProps) {
  const { t } = useTranslation('checkout');

  return (
    <Box className={styles.card}>
      <Typography className={styles.sectionTitle}>{t('payment.title')}</Typography>

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
                    {t(method.labelKey)}
                  </Typography>
                  {method.subLabelKey && (
                    <Typography className={styles.methodSub}>
                      {t(method.subLabelKey)}
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
                      label={t('payment.expiry')}
                      className={styles.field}
                      slotProps={{ inputLabel: { className: styles.fieldLabel }, input: { className: styles.input } }}
                    />
                    <TextField
                      placeholder="•••"
                      label={t('payment.cvc')}
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
