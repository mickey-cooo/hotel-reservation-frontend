'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from './RegisterForm.module.scss';
import { useTranslation } from 'react-i18next';
import { registerAction } from '@/service/auth/auth-actions';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

export default function RegisterForm() {
  const { t } = useTranslation('signUp');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  const onSubmit = async ({
    email,
    password,
    confirmPassword,
  }: RegisterFormValues) => {
    setError('');
    try {
      const result = await registerAction({ email, password, confirmPassword });
      if (!result.ok) {
        setError(result.message || t('signUpFail'));
        return;
      }
      router.push('/login');
    } catch {
      setError(t('signUpFail'));
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
          {t('title')}
        </Typography>
        <Box className={styles.titleAccent} />
        <Typography className={styles.subtitle}>{t('subTitle')}</Typography>
      </Box>

      <Box className={styles.fields}>
        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>{t('email')}</Typography>
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
          <Typography className={styles.label}>{t('password')}</Typography>
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

        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>{t('confirmPassword')}</Typography>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value) =>
                value === watch('password') ||
                t('auth.confirmPasswordInvalid'),
            }}
            render={({ field, fieldState }) => (
              <>
                <OutlinedInput
                  {...field}
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={styles.input}
                  startAdornment={
                    <InputAdornment position="start">
                      <VerifiedUserOutlinedIcon className={styles.inputIcon} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                        className={styles.eyeBtn}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffOutlinedIcon
                            className={styles.inputIcon}
                          />
                        ) : (
                          <VisibilityOutlinedIcon
                            className={styles.inputIcon}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {fieldState.error && (
                  <Typography className={styles.fieldError}>
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Box>
      </Box>

      <Box className={styles.checkboxes}>
        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: true }}
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
                <Typography className={styles.checkboxLabel}>
                  {t('termPrefix')}{' '}
                  <Link
                    href="#"
                    underline="always"
                    className={styles.termsLink}
                  >
                    {t('termLink')}
                  </Link>{' '}
                  {' '}{t('termSuffix')}
                </Typography>
              }
            />
          )}
        />
        <Controller
          name="subscribeNewsletter"
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
                <Typography className={styles.checkboxLabel}>
                  {t('newsletter')}
                </Typography>
              }
            />
          )}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        className={styles.registerBtn}
        disabled={isSubmitting || !isValid}
      >
        {t('buttonSubmit')}
      </Button>

      <Box className={styles.loginRow}>
        <Typography className={styles.loginText}>
          {t('haveAccount')}
        </Typography>
        <Link href="/login" underline="none" className={styles.loginLink}>
          {t('signIn')}
        </Link>
      </Box>
    </Box>
  );
}
