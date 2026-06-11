'use client';

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
  function handleField(field: keyof BillingValues) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...values, [field]: e.target.value });
  }

  return (
    <Box className={styles.card}>
      <Typography className={styles.sectionTitle}>Billing Information</Typography>

      <Box className={styles.nameRow}>
        <TextField
          label="First Name"
          value={values.firstName}
          onChange={handleField('firstName')}
          placeholder="First name"
          fullWidth
          className={styles.field}
          slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
        />
        <TextField
          label="Last Name"
          value={values.lastName}
          onChange={handleField('lastName')}
          placeholder="Last name"
          fullWidth
          className={styles.field}
          slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
        />
      </Box>

      <TextField
        label="Email"
        type="email"
        value={values.email}
        onChange={handleField('email')}
        placeholder="example@lumina.com"
        fullWidth
        className={styles.field}
        slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
      />

      <TextField
        label="Address"
        value={values.address}
        onChange={handleField('address')}
        placeholder="Street, district, province"
        fullWidth
        className={styles.field}
        slotProps={{ inputLabel: { className: styles.label }, input: { className: styles.input } }}
      />
    </Box>
  );
}
