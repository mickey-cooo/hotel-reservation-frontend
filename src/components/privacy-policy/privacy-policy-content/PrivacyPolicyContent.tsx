'use client';

import { Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from './PrivacyPolicyContent.module.scss';

const COLLECT_ITEMS = [
  {
    title: 'Identity Data',
    body: 'Full name, passport details, and date of birth for international travel compliance.',
  },
  {
    title: 'Contact Data',
    body: 'Residential address, billing address, personal email, and telephone numbers.',
  },
  {
    title: 'Financial Data',
    body: 'Encrypted payment card details and transaction history.',
  },
  {
    title: 'Preference Data',
    body: 'Dietary requirements, pillow preferences, and historical stay details to personalize your concierge service.',
  },
] as const;

const USE_CARDS = [
  {
    title: 'Service Execution',
    body: 'Processing reservations, managing check-ins, and facilitating on-site concierge requests.',
  },
  {
    title: 'Personalization',
    body: 'Tailoring room settings and curated destination recommendations based on your unique profile.',
  },
] as const;

const SECURITY_ITEMS = [
  {
    Icon: LockOutlinedIcon,
    title: 'Advanced Encryption',
    body: 'All sensitive data is encrypted using AES-256 standards both at rest and in transit.',
  },
  {
    Icon: VerifiedUserOutlinedIcon,
    title: 'Access Control',
    body: 'Strict "Least Privilege" access policies ensure only essential personnel interact with your information.',
  },
] as const;

const RIGHTS_ITEMS = [
  'Request access to your data profile',
  'Rectify inaccurate information',
  'Request the "Right to be Forgotten"',
  'Object to automated processing',
] as const;

export default function PrivacyPolicyContent() {
  return (
    <Box className={styles.page}>
      {/* Hero */}
      <Box className={styles.heroWrap}>
        <Container maxWidth="md">
          <Box className={styles.hero}>
            <Box className={styles.badge}>
              <Typography className={styles.badgeText}>Privacy Commitment</Typography>
            </Box>
            <Typography variant="h1" className={styles.pageTitle}>
              Privacy Policy
            </Typography>
            <Typography className={styles.intro}>
              At Lumina Stay, we treat your personal data with the same uncompromising standard
              of excellence as we do our guest experiences.
            </Typography>
            <Box className={styles.meta}>
              <Typography className={styles.metaText}>Effective Date: June 1, 2024</Typography>
              <Box className={styles.metaDot} />
              <Typography className={styles.metaText}>Version 2.1</Typography>
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
                Information We Collect
              </Typography>
            </Box>
            <Typography className={styles.body}>
              To provide you with a bespoke travel experience, Lumina Stay collects information
              that identifies you or relates to an identifiable individual (&ldquo;Personal
              Information&rdquo;). This includes:
            </Typography>
            <Box className={styles.checkList}>
              {COLLECT_ITEMS.map(({ title, body }) => (
                <Box key={title} className={styles.checkItem}>
                  <CheckCircleOutlinedIcon className={styles.checkIcon} />
                  <Typography className={styles.checkText}>
                    <strong>{title}:</strong> {body}
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
                How We Use Your Data
              </Typography>
            </Box>
            <Typography className={styles.body}>
              Our use of your information is strictly governed by the necessity of fulfilling our
              luxury service standards and legal obligations. We utilize your data to:
            </Typography>
            <Box className={styles.cardGrid}>
              {USE_CARDS.map(({ title, body }) => (
                <Box key={title} className={styles.card}>
                  <Typography className={styles.cardTitle}>{title}</Typography>
                  <Typography className={styles.cardBody}>{body}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Quote image */}
          <Box className={styles.quoteWrap}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80"
              alt="Luxury hotel interior"
              className={styles.quoteImg}
            />
            <Box className={styles.quoteOverlay}>
              <Typography className={styles.quoteText}>
                &ldquo;Privacy is the ultimate luxury.&rdquo;
              </Typography>
            </Box>
          </Box>

          {/* Section 03 — Data Security & Sovereignty */}
          <Box component="section" className={styles.section}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionNum}>03</Typography>
              <Typography variant="h2" className={styles.sectionTitle}>
                Data Security &amp; Sovereignty
              </Typography>
            </Box>
            <Typography className={styles.body}>
              We implement industry-leading technical and organizational measures to protect your
              Personal Information. Our security framework includes:
            </Typography>
            <Box className={styles.iconItemList}>
              {SECURITY_ITEMS.map(({ Icon, title, body }) => (
                <Box key={title} className={styles.iconItem}>
                  <Box className={styles.iconCircle}>
                    <Icon className={styles.iconCircleIcon} />
                  </Box>
                  <Box>
                    <Typography className={styles.iconItemTitle}>{title}</Typography>
                    <Typography className={styles.iconItemBody}>{body}</Typography>
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
                Your Rights
              </Typography>
            </Box>
            <Typography className={styles.body}>
              As a Lumina Stay guest, you retain full sovereignty over your data. Under global
              data protection regulations (including GDPR and CCPA), you have the right to:
            </Typography>
            <Box className={styles.rightsBox}>
              <Box className={styles.rightsGrid}>
                {RIGHTS_ITEMS.map((item) => (
                  <Box key={item} className={styles.rightsItem}>
                    <Box className={styles.rightsDot} />
                    <Typography className={styles.rightsText}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Contact CTA */}
          <Box className={styles.ctaBox}>
            <Typography variant="h3" className={styles.ctaTitle}>
              Privacy Inquiries
            </Typography>
            <Typography className={styles.ctaBody}>
              Should you have any questions regarding our privacy practices or wish to exercise your
              rights, our dedicated Data Protection Officer is available to assist.
            </Typography>
            <Box
              component="a"
              href="mailto:privacy@luminastay.com"
              className={styles.ctaButton}
            >
              <EmailOutlinedIcon className={styles.ctaButtonIcon} />
              Contact Privacy Team
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
