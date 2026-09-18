'use client';

import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const FOOTER_LINKS = [
  { key: 'privacyPolicy', href: '/privacy-policy' },
  { key: 'termsOfService', href: '/terms-of-service' },
  { key: 'helpCenter', href: '/help-center' },
  { key: 'contactUs', href: '/contact' },
  { key: 'concierge', href: '/concierge' },
] as const;

export default function Footer() {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Box component="footer" className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" className={styles.brandName}>
              Lumina Stay
            </Typography>
            <Typography className={styles.brandDesc}>
              {t('footer.brandDesc')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box className={styles.socialRow}>
              <IconButton size="small" className={styles.socialBtn}>
                <SmartphoneOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={styles.socialBtn}>
                <ShareOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className={styles.socialBtn}>
                <EmailOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider className={styles.divider} />

        <Box className={styles.bottomRow}>
          <Box className={styles.linkList}>
            {FOOTER_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                underline="none"
                className={styles.footerLink}
                onClick={() => router.push(href)}
              >
                {t(`footer.${key}`)}
              </Link>
            ))}
          </Box>
          <Typography className={styles.copyright}>
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
