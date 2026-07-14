'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField, Typography } from '@mui/material';
import styles from './BillingForm.module.scss';

export interface BillingValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

interface BillingFormProps {
  values: BillingValues;
  onChange: (values: BillingValues) => void;
}

export default function BillingForm({ values, onChange }: BillingFormProps) {
  const { control, watch } = useForm<BillingValues>({ defaultValues: values });

  useEffect(() => {
    const subscription = watch((value) => onChange(value as BillingValues));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <Box className={styles.card}>
      <Typography className={styles.sectionTitle}>Billing Information</Typography>

      <Box className={styles.nameRow}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              placeholder="First name"
              fullWidth
              className={styles.field}
              slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              placeholder="Last name"
              fullWidth
              className={styles.field}
              slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
            />
          )}
        />
      </Box>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            placeholder="example@lumina.com"
            fullWidth
            className={styles.field}
            slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            placeholder="Street, district, province"
            fullWidth
            className={styles.field}
            slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
          />
        )}
      />
    </Box>
  );
}
