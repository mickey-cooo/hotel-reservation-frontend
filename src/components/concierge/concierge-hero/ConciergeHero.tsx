'use client';

import { Box, Container, Typography } from '@mui/material';
import styles from './ConciergeHero.module.scss';
import { useTranslation } from 'react-i18next';

export default function ConciergeHero() {
  const { t } = useTranslation('concierge');
  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.inner}>
          <Typography component="p" className={styles.eyebrow}>
            {t('heroEyebrow')}
          </Typography>
          <Typography variant="h1" className={styles.heading}>
            {t('heroTitle')}
          </Typography>
          <Typography className={styles.subtitle}>
            {t('heroSubtitle')}
          </Typography>
          <Box className={styles.divider} />
        </Box>
      </Container>
    </Box>
  );
}
