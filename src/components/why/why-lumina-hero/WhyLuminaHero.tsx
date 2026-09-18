'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './WhyLuminaHero.module.scss';
import { useTranslation } from 'react-i18next';

export default function WhyLuminaHero() {
  const { t } = useTranslation('whyLumina');
  return (
    <Box className={styles.hero}>
      <Box className={styles.overlay} />
      <Container maxWidth="lg" className={styles.content}>
        <Typography variant="caption" className={styles.label}>
          {t('hero.label')}
        </Typography>
        <Typography variant="h1" className={styles.title}>
          {t('hero.titleLine1')}
          <br />
          <span className={styles.titleGold}>{t('hero.titleLine2')}</span>
        </Typography>
        <Typography className={styles.desc}>
          {t('hero.desc')}
        </Typography>
        <Box className={styles.actions}>
          <Button
            component={Link}
            href="/destinations"
            variant="contained"
            className={styles.btnPrimary}
          >
            {t('hero.bookNow')}
          </Button>
          <Button
            component={Link}
            href="#why-book"
            variant="outlined"
            className={styles.btnSecondary}
          >
            {t('hero.learnMore')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
