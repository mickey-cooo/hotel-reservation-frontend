'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ContactHubs.module.scss';

const HUBS = [
  {
    key: 'london',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
  },
  {
    key: 'tokyo',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    key: 'dubai',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  },
] as const;

export default function ContactHubs() {
  const { t } = useTranslation('contact');

  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.header}>
          <Typography variant="h2" className={styles.heading}>
            {t('hubs.heading')}
          </Typography>
          <Typography className={styles.subheading}>
            {t('hubs.subheading')}
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {HUBS.map(({ key, img }) => (
            <Box key={key} className={styles.card}>
              <Box
                component="img"
                src={img}
                alt={`${t(`hubs.${key}`)} skyline`}
                className={styles.cardImg}
              />
              <Box className={styles.cardOverlay} aria-hidden />
              <Box className={styles.cardBody}>
                <Typography className={styles.cardCity}>{t(`hubs.${key}`)}</Typography>
                <Typography className={styles.cardRole}>{t(`hubs.${key}Role`)}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
