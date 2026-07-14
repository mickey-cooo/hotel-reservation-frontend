'use client';

import { Controller, useForm } from 'react-hook-form';
import { Box, Button, InputAdornment, Link, OutlinedInput, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './ForgotPasswordForm.module.scss';

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordForm() {
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
          ลืมรหัสผ่าน?
        </Typography>
        <Box className={styles.titleAccent} />
        <Typography className={styles.description}>
          กรุณากรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้คุณ
        </Typography>
      </Box>

      <Box className={styles.fieldGroup}>
        <Typography className={styles.label}>อีเมล (EMAIL)</Typography>
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
        ส่งลิงก์กู้คืนรหัสผ่าน
      </Button>

      <Box className={styles.backRow}>
        <Link href="/login" underline="none" className={styles.backLink}>
          <ArrowBackIcon className={styles.backIcon} />
          กลับสู่หน้าเข้าสู่ระบบ
        </Link>
      </Box>
    </Box>
  );
}
