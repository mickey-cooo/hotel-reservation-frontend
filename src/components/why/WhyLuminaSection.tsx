'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useTranslation } from 'react-i18next';
import styles from './WhyLuminaSection.module.scss';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    alt: 'Luxury bedroom',
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
    alt: 'Spa room',
    gridColumn: '2 / 3',
    gridRow: '1 / 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80',
    alt: 'City view at night',
    gridColumn: '1 / 3',
    gridRow: '2 / 3',
  },
] as const;

const FEATURES = [
  {
    key: 'verified',
    icon: VerifiedOutlinedIcon,
  },
  {
    key: 'concierge',
    icon: SupportAgentIcon,
  },
] as const;

export default function WhyLuminaSection() {
  const { t } = useTranslation('home');

  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Grid container spacing={6} className={styles.gridRow}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="caption" className={styles.sectionLabel}>
              {t('whyLumina.sectionLabel')}
            </Typography>
            <Typography variant="h3" className={styles.sectionTitle}>
              {t('whyLumina.sectionTitle')}
            </Typography>
            <Typography className={styles.sectionBody}>
              {t('whyLumina.sectionBody')}
            </Typography>

            <Box className={styles.featureList}>
              {FEATURES.map(({ key, icon: Icon }) => (
                <Box key={key} className={styles.featureItem}>
                  <Box className={styles.iconWrapper}>
                    <Icon className={styles.icon} />
                  </Box>
                  <Box>
                    <Typography className={styles.featureTitle}>
                      {t(`whyLumina.${key}Title`)}
                    </Typography>
                    <Typography className={styles.featureDescription}>
                      {t(`whyLumina.${key}Desc`)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box className={styles.gallery}>
              {GALLERY_IMAGES.map((img) => (
                <Box
                  key={img.alt}
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  className={styles.galleryImg}
                  style={{ gridColumn: img.gridColumn, gridRow: img.gridRow }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
