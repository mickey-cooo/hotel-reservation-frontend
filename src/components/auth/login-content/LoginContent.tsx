import { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import LoginHero from '@/components/auth/login-hero/LoginHero';
import LoginForm from '@/components/auth/login-form/LoginForm';
import styles from './LoginContent.module.scss';

export default function LoginContent() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.card}>
        <LoginHero />
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </Box>
      <Typography className={styles.siteFooter}>
        LUMINA STAY • GLOBAL HOSPITALITY EXCELLENCE
      </Typography>
    </Box>
  );
}
