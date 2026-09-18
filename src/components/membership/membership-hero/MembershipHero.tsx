'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './MembershipHero.module.scss';
import { useUserEmail } from '@/hooks/useUserEmail';

export default function MembershipHero() {
  const userEmail = useUserEmail();
  const { t } = useTranslation('membership');

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
          <span className={styles.badge}>{t('hero.badge')}</span>
          <Typography variant="h1" className={styles.title}>
            {t('hero.titleLine1')}
            <br />
            <span className={styles.titleGold}>{t('hero.titleLine2')}</span>
          </Typography>
          <Typography className={styles.description}>
            {t('hero.description')}
          </Typography>
          <Box className={styles.btnRow}>
            <Button
              variant="contained"
              component={NextLink}
              href={userEmail ? '/bookings' : '/register'}
              className={styles.ctaBtn}
            >
              {userEmail ? t('hero.myAccount') : t('hero.joinNow')}
            </Button>
            <Button
              variant="outlined"
              component={NextLink}
              href="/membership"
              className={styles.outlineBtn}
            >
              {t('hero.learnMore')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
