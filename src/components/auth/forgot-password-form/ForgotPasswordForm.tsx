'use client';

import { Controller, useForm } from 'react-hook-form';
import { Box, Button, InputAdornment, Link, OutlinedInput, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './ForgotPasswordForm.module.scss';
import { useTranslation } from 'react-i18next';

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordForm() {
  const { t } = useTranslation('signIn');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ defaultValues: { email: '' } });

  const onSubmit = ({ email }: ForgotPasswordFormValues) => {
    // TODO: wire up to backend forgot-password endpoint once available
    console.log('forgot password request for', email);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <Box className={styles.brandMark}>
        <Typography className={styles.monogram}>LS</Typography>
      </Box>

      <Box className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          {t('auth.forgotTitle')}
        </Typography>
        <Box className={styles.titleAccent} />
        <Typography className={styles.description}>
          {t('auth.forgotDescription')}
        </Typography>
      </Box>

      <Box className={styles.fieldGroup}>
        <Typography className={styles.label}>{t('auth.forgotEmailLabel')}</Typography>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              fullWidth
              placeholder="example@lumina.com"
              className={styles.input}
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlinedIcon className={styles.inputIcon} />
                </InputAdornment>
              }
            />
          )}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        disabled={isSubmitting}
        className={styles.submitBtn}
        endIcon={<ArrowForwardIcon />}
      >
        {t('auth.forgotSubmit')}
      </Button>

      <Box className={styles.backRow}>
        <Link href="/login" underline="none" className={styles.backLink}>
          <ArrowBackIcon className={styles.backIcon} />
          {t('auth.backToSignIn')}
        </Link>
      </Box>
    </Box>
  );
}
