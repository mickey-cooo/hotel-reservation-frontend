'use client';

import { Box, Button, Grid, Link, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlined';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './BookingBottomCta.module.scss';

export default function BookingBottomCta() {
  const { t } = useTranslation('bookings');

  return (
    <Grid container spacing={3} className={styles.wrapper}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Box className={styles.eliteCard}>
          <Typography variant="h5" className={styles.eliteTitle}>
            {t('cta.eliteTitle')}
          </Typography>
          <Typography className={styles.eliteDesc}>
            {t('cta.eliteDesc')}
          </Typography>
          <Button
            variant="outlined"
            component={NextLink}
            href="/membership"
            className={styles.eliteBtn}
          >
            {t('cta.eliteBtn')}
          </Button>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Box className={styles.assistCard}>
          <Box className={styles.assistIconWrapper}>
            <HelpOutlineIcon className={styles.assistIcon} />
          </Box>
          <Typography variant="h6" className={styles.assistTitle}>
            {t('cta.assistTitle')}
          </Typography>
          <Typography className={styles.assistDesc}>
            {t('cta.assistDesc')}
          </Typography>
          <Link
            component={NextLink}
            href="/concierge"
            underline="none"
            className={styles.assistLink}
          >
            {t('cta.assistLink')}
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
