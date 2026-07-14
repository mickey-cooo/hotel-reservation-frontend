'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './VerifyOtpForm.module.scss';
import { verifyOtpAction } from '@/service/auth/auth-actions';

interface VerifyOtpFormValues {
  otp: string;
}

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyOtpFormValues>({ defaultValues: { otp: '' } });

  const onSubmit = async ({ otp }: VerifyOtpFormValues) => {
    setError('');
    try {
      const result = await verifyOtpAction({ email, otp });
      if (!result.ok) {
        setError(result.message || 'ยืนยัน OTP ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        return;
      }
      router.push('/login');
    } catch {
      setError('ยืนยัน OTP ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {error && <Alert severity="error">{error}</Alert>}
      <Box className={styles.brandMark}>
        <Typography className={styles.monogram}>LS</Typography>
      </Box>

      <Box className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          ยืนยันบัญชีของคุณ
        </Typography>
        <Box className={styles.titleAccent} />
        <Typography className={styles.subtitle}>
          กรุณากรอกรหัส OTP ที่ส่งไปยังอีเมลของคุณ
        </Typography>
      </Box>

      <Box className={styles.fields}>
        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>EMAIL</Typography>
          <OutlinedInput
            fullWidth
            readOnly
            value={email}
            className={styles.input}
            startAdornment={
              <InputAdornment position="start">
                <EmailOutlinedIcon className={styles.inputIcon} />
              </InputAdornment>
            }
          />
        </Box>

        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>OTP CODE</Typography>
          <Controller
            name="otp"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                placeholder="123456"
                className={styles.input}
                startAdornment={
                  <InputAdornment position="start">
                    <PinOutlinedIcon className={styles.inputIcon} />
                  </InputAdornment>
                }
              />
            )}
          />
        </Box>
      </Box>

      <Button
        fullWidth
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting || !email}
      >
        ยืนยัน OTP
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
