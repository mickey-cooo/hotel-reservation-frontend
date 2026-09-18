'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './LuminaCta.module.scss';
import { useTranslation } from 'react-i18next';

export default function LuminaCta() {
  const { t } = useTranslation('whyLumina');
  return (
    <Box className={styles.section}>
      <Container maxWidth="md" className={styles.inner}>
        <Typography variant="h3" className={styles.title}>
          {t('cta.title')}
        </Typography>
        <Typography className={styles.subtitle}>
          {t('cta.subtitle')}
        </Typography>
        <Box className={styles.actions}>
          <Button
            component={Link}
            href="/destinations"
            variant="contained"
            className={styles.btnPrimary}
          >
            {t('cta.findRooms')}
          </Button>
          <Button
            variant="outlined"
            className={styles.btnSecondary}
          >
            {t('cta.joinMembership')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
