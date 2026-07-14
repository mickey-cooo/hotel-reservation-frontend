'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import NextLink from 'next/link';
import styles from './MembershipHero.module.scss';

export default function MembershipHero() {
  return (
    <Box className={styles.hero}>
      <Box className={styles.heroBg}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&q=90"
          alt=""
          aria-hidden="true"
          className={styles.heroImg}
        />
        <Box className={styles.heroOverlay} />
      </Box>

      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.inner}>
          <span className={styles.badge}>Experience Perfection</span>
          <Typography variant="h1" className={styles.title}>
            ยกระดับทุกการเข้าพัก
            <br />
            <span className={styles.titleGold}>ด้วยเอกสิทธิ์เฉพาะคุณ</span>
          </Typography>
          <Typography className={styles.description}>
            เข้าร่วมโปรแกรม Lumina Rewards เพื่อสัมผัสประสบการณ์การบริการเหนือระดับ
            พร้อมรับสิทธิพิเศษที่คัดสรรมาเพื่อตอบโจทย์ไลฟ์สไตล์ที่หรูหราของคุณโดยเฉพาะ
          </Typography>
          <Box className={styles.btnRow}>
            <Button
              variant="contained"
              component={NextLink}
              href="/register"
              className={styles.ctaBtn}
            >
              สมัครสมาชิกตอนนี้
            </Button>
            <Button
              variant="outlined"
              component={NextLink}
              href="/membership"
              className={styles.outlineBtn}
            >
              ดูรายละเอียดเพิ่มเติม
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
