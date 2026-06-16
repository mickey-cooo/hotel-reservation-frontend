'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import NextLink from 'next/link';
import styles from './MembershipHero.module.scss';

export default function MembershipHero() {
  return (
    <Box className={styles.hero}>
      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.inner}>
          <span className={styles.badge}>Experience Perfection</span>
          <Typography variant="h1" className={styles.title}>
            ยกระดับทุกการเข้าพัก
            <br />
            ด้วยเอกสิทธิ์เฉพาะคุณ
          </Typography>
          <Typography className={styles.description}>
            เข้าร่วมโปรแกรม Lumina Rewards เพื่อสัมผัสประสบการณ์การบริการเหนือระดับ
            พร้อมรับสิทธิพิเศษที่คัดสรรมาเพื่อตอบโจทย์ไลฟ์สไตล์ที่หรูหราของคุณโดยเฉพาะ
          </Typography>
          <Button
            variant="contained"
            component={NextLink}
            href="/register"
            className={styles.ctaBtn}
          >
            สมัครสมาชิกตอนนี้
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
