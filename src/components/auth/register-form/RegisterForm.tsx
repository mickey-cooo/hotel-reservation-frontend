'use client';

import { useState } from 'react';
import {
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
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  return (
    <Box className={styles.form}>
      <Box className={styles.brandMark}>
        <Typography className={styles.monogram}>LS</Typography>
      </Box>

      <Box className={styles.header}>
        <Typography variant="h5" className={styles.title}>
          สมัครสมาชิก
        </Typography>
        <Box className={styles.titleAccent} />
        <Typography className={styles.subtitle}>
          เริ่มการเดินทางที่เหนือระดับไปกับเราวันนี้
        </Typography>
      </Box>

      <Box className={styles.fields}>
        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>FULL NAME</Typography>
          <OutlinedInput
            fullWidth
            placeholder="ชื่อ-นามสกุล"
            className={styles.input}
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlinedIcon className={styles.inputIcon} />
              </InputAdornment>
            }
          />
        </Box>

        <Box className={styles.twoCol}>
          <Box className={styles.fieldGroup}>
            <Typography className={styles.label}>EMAIL</Typography>
            <OutlinedInput
              fullWidth
              placeholder="example@lumina.com"
              className={styles.input}
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlinedIcon className={styles.inputIcon} />
                </InputAdornment>
              }
            />
          </Box>
          <Box className={styles.fieldGroup}>
            <Typography className={styles.label}>PHONE NUMBER</Typography>
            <OutlinedInput
              fullWidth
              placeholder="เบอร์โทรศัพท์"
              className={styles.input}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneOutlinedIcon className={styles.inputIcon} />
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>PASSWORD</Typography>
          <OutlinedInput
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
                    <VisibilityOffOutlinedIcon className={styles.inputIcon} />
                  ) : (
                    <VisibilityOutlinedIcon className={styles.inputIcon} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>

        <Box className={styles.fieldGroup}>
          <Typography className={styles.label}>CONFIRM PASSWORD</Typography>
          <OutlinedInput
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
                    <VisibilityOffOutlinedIcon className={styles.inputIcon} />
                  ) : (
                    <VisibilityOutlinedIcon className={styles.inputIcon} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Box>

      <Box className={styles.checkboxes}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className={styles.checkbox}
              size="small"
            />
          }
          label={
            <Typography className={styles.checkboxLabel}>
              ยอมรับ{' '}
              <Link href="#" underline="always" className={styles.termsLink}>
                Terms and Conditions
              </Link>{' '}
              และข้อตกลงการใช้งาน
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={subscribeNewsletter}
              onChange={(e) => setSubscribeNewsletter(e.target.checked)}
              className={styles.checkbox}
              size="small"
            />
          }
          label={
            <Typography className={styles.checkboxLabel}>
              รับข้อมูลข่าวสารและสิทธิพิเศษผ่าน Newsletter Subscription
            </Typography>
          }
        />
      </Box>

      <Button fullWidth className={styles.registerBtn}>
        สร้างบัญชีผู้ใช้
      </Button>

      <Box className={styles.loginRow}>
        <Typography className={styles.loginText}>เป็นสมาชิกอยู่แล้ว?</Typography>
        <Link href="/login" underline="none" className={styles.loginLink}>
          เข้าสู่ระบบที่นี่
        </Link>
      </Box>
    </Box>
  );
}
