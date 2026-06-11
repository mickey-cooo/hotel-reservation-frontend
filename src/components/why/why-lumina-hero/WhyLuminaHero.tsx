'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './WhyLuminaHero.module.scss';

export default function WhyLuminaHero() {
  return (
    <Box className={styles.hero}>
      <Box className={styles.overlay} />
      <Container maxWidth="lg" className={styles.content}>
        <Typography variant="caption" className={styles.label}>
          Direct Booking Benefits
        </Typography>
        <Typography variant="h1" className={styles.title}>
          สิทธิพิเศษเหนือระดับ
          <br />
          <span className={styles.titleGold}>เมื่อจอง โดยตรงกับเรา</span>
        </Typography>
        <Typography className={styles.desc}>
          สัมผัสความหรูหราที่มาพร้อมกับความคุ้มค่าสูงสุด และการบริการที่เป็นส่วนตัวยิ่งกว่า
          เมื่อคุณเลือกจองห้องพักผ่านเว็บไซต์ทางการของ Lumina Stay
        </Typography>
        <Box className={styles.actions}>
          <Button
            component={Link}
            href="/destinations"
            variant="contained"
            className={styles.btnPrimary}
          >
            จองตอนนี้
          </Button>
          <Button
            component={Link}
            href="#why-book"
            variant="outlined"
            className={styles.btnSecondary}
          >
            ดูรายละเอียดเพิ่มเติม
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
