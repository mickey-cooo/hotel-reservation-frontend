'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './LuminaCta.module.scss';

export default function LuminaCta() {
  return (
    <Box className={styles.section}>
      <Container maxWidth="md" className={styles.inner}>
        <Typography variant="h3" className={styles.title}>
          เริ่มต้นการเดินทางที่สมบูรณ์แบบ
        </Typography>
        <Typography className={styles.subtitle}>
          ปลดล็อกสิทธิพิเศษของคุณวันนี้ และร่วมเป็นส่วนหนึ่งของครอบครัว Lumina Stay
        </Typography>
        <Box className={styles.actions}>
          <Button
            component={Link}
            href="/destinations"
            variant="contained"
            className={styles.btnPrimary}
          >
            ค้นหาห้องพัก
          </Button>
          <Button
            variant="outlined"
            className={styles.btnSecondary}
          >
            สมัครสมาชิก
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
