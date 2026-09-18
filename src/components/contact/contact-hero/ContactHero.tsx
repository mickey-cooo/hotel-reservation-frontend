'use client';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ContactHero.module.scss';

export default function ContactHero() {
  const { t } = useTranslation('contact');

  return (
    <Box className={styles.root}>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80"
        alt=""
        aria-hidden
        className={styles.bg}
      />
      <Box className={styles.overlay} aria-hidden />
      <Box className={styles.content}>
        <Typography variant="h1" className={styles.title}>
          {t('hero.title')}
        </Typography>
        <Typography className={styles.subtitle}>
          {t('hero.subtitle')}
        </Typography>
      </Box>
    </Box>
  );
}
