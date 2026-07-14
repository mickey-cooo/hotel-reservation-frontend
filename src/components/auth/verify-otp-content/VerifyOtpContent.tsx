import { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import LoginHero from '@/components/auth/login-hero/LoginHero';
import VerifyOtpForm from '@/components/auth/verify-otp-form/VerifyOtpForm';
import styles from './VerifyOtpContent.module.scss';

export default function VerifyOtpContent() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.card}>
        <LoginHero />
        <Suspense fallback={null}>
          <VerifyOtpForm />
        </Suspense>
      </Box>
      <Typography className={styles.siteFooter}>
        LUMINA STAY • GLOBAL HOSPITALITY EXCELLENCE
      </Typography>
    </Box>
  );
}
