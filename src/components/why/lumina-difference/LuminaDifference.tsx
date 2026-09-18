'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import styles from './LuminaDifference.module.scss';
import { useTranslation } from 'react-i18next';

const FEATURES = [
  { icon: EmojiEventsOutlinedIcon, title: 'rewardsTitle', desc: 'rewardsDesc' },
  { icon: BoltOutlinedIcon, title: 'confirmationTitle', desc: 'confirmationDesc' },
  { icon: LocalOfferOutlinedIcon, title: 'perksTitle', desc: 'perksDesc' },
] as const;

export default function LuminaDifference() {
  const { t } = useTranslation(['whyLumina', 'common']);
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Grid container spacing={6} className={styles.grid}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" className={styles.title}>
              {t('difference.title')}
            </Typography>
            <Box className={styles.featureList}>
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <Box key={title} className={styles.featureItem}>
                  <Box className={styles.iconWrapper}>
                    <Icon className={styles.icon} />
                  </Box>
                  <Box>
                    <Typography className={styles.featureTitle}>
                      {t(`difference.${title}`)}
                    </Typography>
                    <Typography className={styles.featureDesc}>
                      {t(`difference.${desc}`)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box className={styles.trustCard}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80"
                alt={t('common:imageAlt.poolSunset')}
                className={styles.trustImg}
              />
              <Box className={styles.trustBadge}>
                <VerifiedOutlinedIcon className={styles.badgeIcon} />
                <Box>
                  <Typography className={styles.badgeTitle}>
                    {t('difference.trustBadge')}
                  </Typography>
                  <Typography className={styles.badgeSub}>
                    {t('difference.officialPartner')}
                  </Typography>
                </Box>
              </Box>
              <Typography className={styles.trustQuote}>
                {t('difference.trustQuote')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
