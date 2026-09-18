'use client';

import { Box, Container, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import StarIcon from '@mui/icons-material/Star';
import styles from './WhyBookBento.module.scss';

import { useTranslation } from 'react-i18next';

const MEMBER_PERKS = ['perk1', 'perk2', 'perk3', 'perk4'] as const;

export default function WhyBookBento() {
  const { t } = useTranslation(['whyLumina', 'common']);
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.heading}>
          <Typography variant="caption" className={styles.label}>
            {t('bento.label')}
          </Typography>
          <Typography variant="h3" className={styles.title}>
            {t('bento.title')}
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {/* Top-left: hotel image */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
            alt={t('common:imageAlt.luxuryRoom')}
            className={`${styles.cell} ${styles.imgCell}`}
          />

          {/* Top-center: Best service card */}
          <Box className={`${styles.cell} ${styles.serviceCard}`}>
            <CheckCircleOutlineIcon className={styles.serviceIcon} />
            <Typography className={styles.cardTitle}>
              {t('bento.bestRateTitle')}
            </Typography>
            <Typography className={styles.cardDesc}>
              {t('bento.bestRateDesc')}
            </Typography>
          </Box>

          {/* Top-right: 24/7 support dark card */}
          <Box className={`${styles.cell} ${styles.supportCard}`}>
            <SupportAgentIcon className={styles.supportIcon} />
            <Typography className={styles.supportTitle}>
              {t('bento.supportTitle')}
            </Typography>
            <Typography className={styles.supportDesc}>
              {t('bento.supportDesc')}
            </Typography>
            <Box className={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} className={styles.star} />
              ))}
              <Typography className={styles.ratingText}>5.0</Typography>
            </Box>
          </Box>

          {/* Bottom-left: member benefits card */}
          <Box className={`${styles.cell} ${styles.memberCard}`}>
            <CardMembershipIcon className={styles.memberIcon} />
            <Typography className={styles.cardTitle}>
              {t('bento.memberPerksTitle')}
            </Typography>
            <Box className={styles.perkList}>
              {MEMBER_PERKS.map((perk) => (
                <Box key={perk} className={styles.perkRow}>
                  <Box className={styles.perkDot} />
                  <Typography className={styles.perkText}>{t(`bento.${perk}`)}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Bottom-center: no hidden fees card */}
          <Box className={`${styles.cell} ${styles.noFeesCard}`}>
            <NoEncryptionGmailerrorredIcon className={styles.noFeesIcon} />
            <Typography className={styles.cardTitle}>
              {t('bento.noFeesTitle')}
            </Typography>
            <Typography className={styles.cardDesc}>
              {t('bento.noFeesDesc')}
            </Typography>
          </Box>

          {/* Bottom-right: pool image */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80"
            alt={t('common:imageAlt.luxuryPool')}
            className={`${styles.cell} ${styles.imgCell}`}
          />
        </Box>
      </Container>
    </Box>
  );
}
