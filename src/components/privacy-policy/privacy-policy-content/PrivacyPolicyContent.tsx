'use client';

import { Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from './PrivacyPolicyContent.module.scss';
import { useTranslation } from 'react-i18next';

const COLLECT_ITEMS = [0, 1, 2, 3];
const USE_CARDS = [0, 1];

const SECURITY_ITEMS = [LockOutlinedIcon, VerifiedUserOutlinedIcon] as const;
const RIGHTS_ITEMS = [0, 1, 2, 3];

export default function PrivacyPolicyContent() {
  const { t } = useTranslation('privacyPolicy');
  const collectItems = t('collect', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const useCards = t('uses', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const securityItems = t('security', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const rightsItems = t('rights', { returnObjects: true }) as string[];
  return (
    <Box className={styles.page}>
      {/* Hero */}
      <Box className={styles.heroWrap}>
        <Container maxWidth="md">
          <Box className={styles.hero}>
            <Box className={styles.badge}>
              <Typography className={styles.badgeText}>{t('badge')}</Typography>
            </Box>
            <Typography variant="h1" className={styles.pageTitle}>
              {t('title')}
            </Typography>
            <Typography className={styles.intro}>
              {t('intro')}
            </Typography>
            <Box className={styles.meta}>
              <Typography className={styles.metaText}>{t('effectiveDate')}</Typography>
              <Box className={styles.metaDot} />
              <Typography className={styles.metaText}>{t('version')}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md">
        <Box className={styles.content}>
          {/* Section 01 — Information We Collect */}
          <Box component="section" className={styles.section}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionNum}>01</Typography>
              <Typography variant="h2" className={styles.sectionTitle}>
                {t('sections.collectTitle')}
              </Typography>
            </Box>
            <Typography className={styles.body}>
              {t('sections.collectBody')}
            </Typography>
            <Box className={styles.checkList}>
              {COLLECT_ITEMS.map((index) => (
                <Box key={index} className={styles.checkItem}>
                  <CheckCircleOutlinedIcon className={styles.checkIcon} />
                  <Typography className={styles.checkText}>
                    <strong>{collectItems[index].title}:</strong> {collectItems[index].body}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Section 02 — How We Use Your Data */}
          <Box component="section" className={styles.section}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionNum}>02</Typography>
              <Typography variant="h2" className={styles.sectionTitle}>
                {t('sections.useTitle')}
              </Typography>
            </Box>
            <Typography className={styles.body}>
              {t('sections.useBody')}
            </Typography>
            <Box className={styles.cardGrid}>
              {USE_CARDS.map((index) => (
                <Box key={index} className={styles.card}>
                  <Typography className={styles.cardTitle}>{useCards[index].title}</Typography>
                  <Typography className={styles.cardBody}>{useCards[index].body}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Quote image */}
          <Box className={styles.quoteWrap}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80"
              alt={t('common:imageAlt.interior')}
              className={styles.quoteImg}
            />
            <Box className={styles.quoteOverlay}>
              <Typography className={styles.quoteText}>
                {t('sections.quote')}
              </Typography>
            </Box>
          </Box>

          {/* Section 03 — Data Security & Sovereignty */}
          <Box component="section" className={styles.section}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionNum}>03</Typography>
              <Typography variant="h2" className={styles.sectionTitle}>
                {t('sections.securityTitle')}
              </Typography>
            </Box>
            <Typography className={styles.body}>
              {t('sections.securityBody')}
            </Typography>
            <Box className={styles.iconItemList}>
              {SECURITY_ITEMS.map((Icon, index) => (
                <Box key={index} className={styles.iconItem}>
                  <Box className={styles.iconCircle}>
                    <Icon className={styles.iconCircleIcon} />
                  </Box>
                  <Box>
                    <Typography className={styles.iconItemTitle}>{securityItems[index].title}</Typography>
                    <Typography className={styles.iconItemBody}>{securityItems[index].body}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Section 04 — Your Rights */}
          <Box component="section" className={styles.section}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionNum}>04</Typography>
              <Typography variant="h2" className={styles.sectionTitle}>
                {t('sections.rightsTitle')}
              </Typography>
            </Box>
            <Typography className={styles.body}>
              {t('sections.rightsBody')}
            </Typography>
            <Box className={styles.rightsBox}>
              <Box className={styles.rightsGrid}>
                {RIGHTS_ITEMS.map((index) => (
                  <Box key={index} className={styles.rightsItem}>
                    <Box className={styles.rightsDot} />
                    <Typography className={styles.rightsText}>{rightsItems[index]}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Contact CTA */}
          <Box className={styles.ctaBox}>
            <Typography variant="h3" className={styles.ctaTitle}>
              {t('sections.privacyInquiries')}
            </Typography>
            <Typography className={styles.ctaBody}>
              {t('sections.privacyInquiriesBody')}
            </Typography>
            <Box
              component="a"
              href="mailto:privacy@luminastay.com"
              className={styles.ctaButton}
            >
              <EmailOutlinedIcon className={styles.ctaButtonIcon} />
              {t('sections.contactTeam')}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
