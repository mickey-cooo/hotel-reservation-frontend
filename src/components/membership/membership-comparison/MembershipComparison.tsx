'use client';

import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import styles from './MembershipComparison.module.scss';

interface Feature {
  key: string;
  essential: boolean;
  select: boolean;
  elite: boolean;
}

const FEATURES: Feature[] = [
  { key: 'rewardPoints', essential: true, select: true, elite: true },
  { key: 'exclusiveRates', essential: true, select: true, elite: true },
  { key: 'lateCheckout', essential: false, select: true, elite: true },
  { key: 'roomUpgrade', essential: false, select: false, elite: true },
  { key: 'priorityCheckin', essential: false, select: false, elite: true },
];

type TierKey = 'essential' | 'select' | 'elite';

const TIER_DOTS: Array<{ key: TierKey; featured: boolean }> = [
  { key: 'essential', featured: false },
  { key: 'select', featured: true },
  { key: 'elite', featured: false },
];

export default function MembershipComparison() {
  const { t } = useTranslation('membership');

  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <Box className={styles.header}>
          <Box>
            <Typography variant="h2" className={styles.sectionTitle}>
              {t('comparison.sectionTitle')}
            </Typography>
            <Typography className={styles.sectionSubtitle}>
              {t('comparison.sectionSubtitle')}
            </Typography>
          </Box>
          <Box className={styles.legend}>
            {TIER_DOTS.map(({ key, featured }) => (
              <Box key={key} className={styles.legendItem}>
                <Box
                  className={`${styles.legendDot}${featured ? ` ${styles.legendDotFeatured}` : key === 'elite' ? ` ${styles.legendDotElite}` : ''}`}
                />
                <Typography className={styles.legendLabel}>{t(`comparison.${key}`)}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className={styles.tableWrapper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow className={styles.tableHeadRow}>
                <TableCell className={`${styles.tableCell} ${styles.tableCellFeature}`}>
                  {t('comparison.benefits')}
                </TableCell>
                <TableCell className={`${styles.tableCell} ${styles.tableCellTier}`}>
                  {t('comparison.essential')}
                </TableCell>
                <TableCell className={`${styles.tableCell} ${styles.tableCellTier} ${styles.tableCellTierSelect}`}>
                  {t('comparison.select')}
                </TableCell>
                <TableCell className={`${styles.tableCell} ${styles.tableCellTier}`}>
                  {t('comparison.elite')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FEATURES.map((feature) => (
                <TableRow key={feature.key} className={styles.tableRow}>
                  <TableCell className={`${styles.tableCell} ${styles.tableCellFeatureName}`}>
                    {t(`comparison.features.${feature.key}`)}
                  </TableCell>
                  {TIER_DOTS.map(({ key, featured }) => (
                    <TableCell
                      key={key}
                      className={`${styles.tableCell} ${styles.tableCellCheck}`}
                    >
                      {feature[key] ? (
                        <CheckIcon
                          className={`${styles.checkIcon}${featured ? ` ${styles.checkIconFeatured}` : ''}`}
                        />
                      ) : (
                        <span className={styles.dash}>—</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
}
