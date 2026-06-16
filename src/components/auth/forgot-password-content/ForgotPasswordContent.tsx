import { Box, Typography } from '@mui/material';
import ForgotPasswordForm from '@/components/auth/forgot-password-form/ForgotPasswordForm';
import styles from './ForgotPasswordContent.module.scss';

export default function ForgotPasswordContent() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.card}>
        <ForgotPasswordForm />
      </Box>
      <Typography className={styles.siteFooter}>
        LUMINA STAY • GLOBAL HOSPITALITY EXCELLENCE
      </Typography>
    </Box>
  );
}
