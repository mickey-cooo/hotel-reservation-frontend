'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { loginAction } from '@/service/auth/auth-actions';
import styles from './LoginForm.module.scss';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    setError('');
    try {
      const result = await loginAction({ email, password });
      if (!result.ok) {
        setError(result.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        return;
      }
      router.push(searchParams.get('redirectTo') || '/');
    } catch {
      setError('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Box className={styles.brandMark}>
        <Typography className={styles.monogram}>LS</Typography>
      </Box>

      <Box className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          เข้าสู่ระบบ
        </Typography>
        <Box className={styles.titleAccent} />
        <Typography className={styles.subtitle}>
          ยินดีต้อนรับกลับสู่ความหรูหราที่คุณคุ้นเคย
        </Typography>
      </Box>

      <Box className={styles.fields}>
        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>EMAIL</Typography>
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

        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>PASSWORD</Typography>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon className={styles.inputIcon} />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      className={styles.eyeBtn}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon
                          className={styles.inputIcon}
                        />
                      ) : (
                        <VisibilityOutlinedIcon className={styles.inputIcon} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
        </Box>
      </Box>

      <Box className={styles.rememberRow}>
        <Controller
          name="rememberMe"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  className={styles.checkbox}
                  size="small"
                />
              }
              label={
                <Typography className={styles.rememberLabel}>
                  จดจำฉันไว้
                </Typography>
              }
            />
          )}
        />
        <Link
          href="/forgot-password"
          underline="none"
          className={styles.forgotLink}
        >
          ลืมรหัสผ่าน?
        </Link>
      </Box>

      <Button
        fullWidth
        type="submit"
        className={styles.loginBtn}
        disabled={isSubmitting}
      >
        เข้าสู่ระบบ
      </Button>

      <Divider className={styles.divider}>
        <Typography className={styles.dividerText}>
          หรือเข้าสู่ระบบด้วย
        </Typography>
      </Divider>

      <Box className={styles.socialRow}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          className={styles.socialBtn}
        >
          Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AppleIcon />}
          className={styles.socialBtn}
        >
          Apple
        </Button>
      </Box>

      <Box className={styles.registerRow}>
        <Typography className={styles.registerText}>ยังไม่มีบัญชี?</Typography>
        <Link href="/register" underline="none" className={styles.registerLink}>
          สมัครสมาชิกที่นี่
        </Link>
      </Box>
    </Box>
  );
}
