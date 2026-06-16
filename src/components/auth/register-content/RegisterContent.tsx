import { Box, Typography } from '@mui/material';
import LoginHero from '@/components/auth/login-hero/LoginHero';
import RegisterForm from '@/components/auth/register-form/RegisterForm';
import styles from './RegisterContent.module.scss';

export default function RegisterContent() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.card}>
        <LoginHero />
        <RegisterForm />
      </Box>
      <Typography className={styles.siteFooter}>
        LUMINA STAY • GLOBAL HOSPITALITY EXCELLENCE
      </Typography>
    </Box>
  );
}
