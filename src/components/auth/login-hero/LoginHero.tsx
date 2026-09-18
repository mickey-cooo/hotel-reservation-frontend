'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './LoginHero.module.scss';
import { useTranslation } from 'react-i18next';

const PERKS = ['perkRates', 'perkProperties', 'perkConcierge'] as const;

export default function LoginHero() {
  const { t } = useTranslation(['signIn', 'common']);
  return (
    <Box className={styles.hero}>
      <Image
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
        alt={t('common:imageAlt.interior')}
        fill
        className={styles.image}
        sizes="400px"
      />
      <Box className={styles.overlay} />
      <Box className={styles.content}>
        <Box className={styles.brandArea}>
        <Typography className={styles.eyebrow}>{t('auth.welcome')}</Typography>
          <Typography variant="h4" className={styles.brand}>
            Lumina Stay
          </Typography>
          <Box className={styles.goldDivider} />
        </Box>
        <Box className={styles.perks}>
          {PERKS.map((perk) => (
            <Box key={perk} className={styles.perkItem}>
              <Box className={styles.perkDot} />
              <Typography className={styles.perkText}>{t(`auth.${perk}`)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
