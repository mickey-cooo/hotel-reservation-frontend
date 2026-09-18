'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeroSearchBar from '@/components/hero/hero-search-bar/HeroSearchBar';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  const { t } = useTranslation('home');

  return (
    <Box className={styles.hero}>
      <Container maxWidth="md" className={styles.heroContent}>
        <Typography variant="h1" className={styles.heroTitle}>
          {t('hero.title')}
        </Typography>
        <HeroSearchBar />
      </Container>
    </Box>
  );
}
