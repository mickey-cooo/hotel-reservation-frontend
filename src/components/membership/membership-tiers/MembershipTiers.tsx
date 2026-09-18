'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import styles from './MembershipTiers.module.scss';
import { useUserEmail } from '@/hooks/useUserEmail';

interface TierMeta {
  id: 'essential' | 'select' | 'elite';
  priceNoteKey: 'tiers.lifetime' | 'tiers.perYear';
  featured: boolean;
  elite: boolean;
  hasBadge: boolean;
}

const TIER_META: TierMeta[] = [
  { id: 'essential', priceNoteKey: 'tiers.lifetime', featured: false, elite: false, hasBadge: false },
  { id: 'select', priceNoteKey: 'tiers.perYear', featured: true, elite: false, hasBadge: true },
  { id: 'elite', priceNoteKey: 'tiers.perYear', featured: false, elite: true, hasBadge: false },
];

function getPerks(t: TFunction, id: TierMeta['id']): string[] {
  const perks = t(`tiers.${id}.perks`, { returnObjects: true });
  return Array.isArray(perks) ? (perks as string[]) : [];
}

export default function MembershipTiers() {
  const userEmail = useUserEmail();
  const { t } = useTranslation('membership');

  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.heading}>
          <Typography variant="h2" className={styles.sectionTitle}>
            {t('tiers.sectionTitle')}
          </Typography>
          <Typography className={styles.sectionSubtitle}>
            {t('tiers.sectionSubtitle')}
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {TIER_META.map((tier) => {
            const cardClass = [
              styles.card,
              tier.featured ? styles.cardFeatured : '',
              tier.elite ? styles.cardElite : '',
            ]
              .filter(Boolean)
              .join(' ');

            const PerkIcon = tier.elite ? StarIcon : CheckIcon;
            const perks = getPerks(t, tier.id);

            return (
              <Box key={tier.id} className={cardClass}>
                {tier.hasBadge && (
                  <span className={styles.recommendedBadge}>{t(`tiers.${tier.id}.badge`)}</span>
                )}

                <Box className={styles.cardTop}>
                  <Typography
                    className={`${styles.levelLabel}${tier.elite ? ` ${styles.levelLabelElite}` : ''}`}
                  >
                    {t(`tiers.${tier.id}.level`)}
                  </Typography>
                  <Typography
                    variant="h4"
                    className={`${styles.tierName}${tier.elite ? ` ${styles.tierNameElite}` : ''}`}
                  >
                    {t(`tiers.${tier.id}.name`)}
                  </Typography>
                  <Box className={styles.priceRow}>
                    <Typography
                      component="span"
                      className={`${styles.price}${tier.elite ? ` ${styles.priceElite}` : ''}`}
                    >
                      {t(`tiers.${tier.id}.price`)}
                    </Typography>
                    <Typography
                      component="span"
                      className={`${styles.priceNote}${tier.elite ? ` ${styles.priceNoteElite}` : ''}`}
                    >
                      {t(tier.priceNoteKey)}
                    </Typography>
                  </Box>
                  <Typography
                    className={`${styles.tierDesc}${tier.elite ? ` ${styles.tierDescElite}` : ''}`}
                  >
                    {t(`tiers.${tier.id}.description`)}
                  </Typography>
                </Box>

                <Box className={styles.perkList}>
                  {perks.map((perk) => (
                    <Box key={perk} className={styles.perkItem}>
                      <PerkIcon
                        className={`${styles.perkIcon}${tier.elite ? ` ${styles.perkIconElite}` : ''}`}
                      />
                      <Typography
                        className={`${styles.perkText}${tier.elite ? ` ${styles.perkTextElite}` : ''}`}
                      >
                        {perk}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant={tier.featured ? 'contained' : 'outlined'}
                  component={NextLink}
                  href={userEmail ? '/bookings' : '/register'}
                  fullWidth
                  className={`${styles.joinBtn}${tier.featured ? ` ${styles.joinBtnFeatured}` : ''}${tier.elite ? ` ${styles.joinBtnElite}` : ''}`}
                >
                  {userEmail ? t('tiers.myAccount') : t(`tiers.${tier.id}.btnLabel`)}
                </Button>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
