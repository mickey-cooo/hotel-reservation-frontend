'use client';

import { useState } from 'react';
import {
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
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Box className={styles.form}>
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
      </Box>

      <Box className={styles.rememberRow}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
        <Link href="/forgot-password" underline="none" className={styles.forgotLink}>
          ลืมรหัสผ่าน?
        </Link>
      </Box>

      <Button fullWidth className={styles.loginBtn}>
        เข้าสู่ระบบ
      </Button>

      <Divider className={styles.divider}>
        <Typography className={styles.dividerText}>หรือเข้าสู่ระบบด้วย</Typography>
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
