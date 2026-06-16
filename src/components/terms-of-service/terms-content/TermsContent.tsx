'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import styles from './TermsContent.module.scss';

const TABLE_OF_CONTENTS = [
  { id: 'acceptance-of-terms', label: 'Acceptance of Terms' },
  { id: 'user-responsibilities', label: 'User Responsibilities' },
  { id: 'booking-rules', label: 'Booking Rules' },
  { id: 'cancellation-policies', label: 'Cancellation Policies' },
  { id: 'property-standards', label: 'Property Standards' },
  { id: 'liability-indemnity', label: 'Liability & Indemnity' },
] as const;

type SectionId = (typeof TABLE_OF_CONTENTS)[number]['id'];

const RESPONSIBILITY_CARDS = [
  {
    Icon: AccountCircleOutlinedIcon,
    title: 'Identity Verification',
    body: 'Users must provide accurate, current, and complete information during the registration process. Impersonation of any individual or entity is strictly prohibited and grounds for immediate termination.',
  },
  {
    Icon: SecurityOutlinedIcon,
    title: 'Account Security',
    body: 'You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.',
  },
] as const;

const BOOKING_ITEMS = [
  {
    Icon: PaymentsOutlinedIcon,
    title: 'Payment Authorization',
    body: 'Upon booking, a temporary hold may be placed on your payment method. Full payment is typically required at the time of booking unless specified otherwise in the property-specific details.',
  },
  {
    Icon: GroupOutlinedIcon,
    title: 'Occupancy Limits',
    body: 'Properties are limited to the number of guests specified in the confirmation. Unauthorized guests may result in additional fees or immediate eviction without refund.',
  },
] as const;

const REFUND_TIERS = [
  { window: 'Up to 14 days before check-in', refund: '100% Refund' },
  { window: '7 to 13 days before check-in', refund: '50% Refund' },
  { window: 'Less than 7 days before check-in', refund: '0% Refund' },
] as const;

const PROPERTY_CARDS = [
  {
    Icon: CleanHandsOutlinedIcon,
    title: 'Sanitization',
    body: 'Medical-grade cleaning protocols for every stay.',
  },
  {
    Icon: CheckCircleOutlinedIcon,
    title: 'Curation',
    body: 'Every property is personally vetted by our agents.',
  },
  {
    Icon: SupportAgentOutlinedIcon,
    title: '24/7 Concierge',
    body: 'Global support available for all premium bookings.',
  },
] as const;

export default function TermsContent() {
  const [activeId, setActiveId] = useState<SectionId>('acceptance-of-terms');
  const clickLocked = useRef(false);
  const lockTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleTocClick = (id: SectionId) => {
    setActiveId(id);
    clickLocked.current = true;
    clearTimeout(lockTimeout.current);
    lockTimeout.current = setTimeout(() => {
      clickLocked.current = false;
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLocked.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 },
    );

    TABLE_OF_CONTENTS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      clearTimeout(lockTimeout.current);
    };
  }, []);

  return (
    <Box className={styles.page}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box className={styles.hero}>
          <Box className={styles.badge}>
            <GavelOutlinedIcon className={styles.badgeIcon} />
            <Typography className={styles.badgeText}>Updated January 2024</Typography>
          </Box>
          <Typography variant="h1" className={styles.pageTitle}>
            Terms of Service
          </Typography>
          <Typography className={styles.intro}>
            Welcome to Lumina Stay. These terms govern your use of our platform and
            the luxury travel services we provide. By accessing our services, you agree
            to these authoritative standards of conduct and excellence.
          </Typography>
        </Box>

        {/* Grid: TOC sidebar + content */}
        <Box className={styles.grid}>
          {/* Sticky TOC */}
          <Box component="aside" className={styles.tocAside}>
            <Box className={styles.tocSticky}>
              <Typography className={styles.tocLabel}>Contents</Typography>
              <nav>
                <Box className={styles.tocNav}>
                  {TABLE_OF_CONTENTS.map(({ id, label }, index) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`${styles.tocLink}${activeId === id ? ` ${styles.tocLinkActive}` : ''}`}
                      onClick={() => handleTocClick(id)}
                    >
                      {index + 1}. {label}
                    </a>
                  ))}
                </Box>
              </nav>
            </Box>
          </Box>

          {/* Main sections */}
          <Box className={styles.mainContent}>
            {/* Section 01 — Acceptance of Terms */}
            <Box component="section" id="acceptance-of-terms" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>01</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  Acceptance of Terms
                </Typography>
              </Box>
              <Typography className={styles.body}>
                Lumina Stay provides a high-end travel booking platform (&ldquo;Service&rdquo;).
                By creating an account or making a reservation, you acknowledge that you
                have read, understood, and agree to be bound by these Terms of Service
                and our Privacy Policy.
              </Typography>
              <Typography className={styles.body}>
                We reserve the right to update these terms at any time. Significant
                changes will be communicated via email or through the platform interface.
                Continued use after such modifications constitutes acceptance of the
                new terms.
              </Typography>
            </Box>

            {/* Section 02 — User Responsibilities */}
            <Box component="section" id="user-responsibilities" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>02</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  User Responsibilities
                </Typography>
              </Box>
              <Box className={styles.cardGrid}>
                {RESPONSIBILITY_CARDS.map(({ Icon, title, body }) => (
                  <Box key={title} className={styles.card}>
                    <Icon className={styles.cardIcon} />
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
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
                alt="Luxury hotel lobby"
                className={styles.quoteImg}
              />
              <Box className={styles.quoteOverlay}>
                <Typography className={styles.quoteText}>
                  &ldquo;Elegance is not being noticed, it&rsquo;s being remembered.&rdquo;
                </Typography>
              </Box>
            </Box>

            {/* Section 03 — Booking Rules */}
            <Box component="section" id="booking-rules" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>03</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  Booking Rules
                </Typography>
              </Box>
              <Box className={styles.iconItemList}>
                {BOOKING_ITEMS.map(({ Icon, title, body }) => (
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

            {/* Section 04 — Cancellation Policies */}
            <Box component="section" id="cancellation-policies" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>04</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  Cancellation Policies
                </Typography>
              </Box>
              <Box className={styles.policyCard}>
                <Typography className={styles.policyTitle}>
                  The Lumina Standard Policy
                </Typography>
                <Box>
                  {REFUND_TIERS.map(({ window, refund }, index) => (
                    <Box
                      key={window}
                      className={`${styles.policyRow}${index < REFUND_TIERS.length - 1 ? ` ${styles.policyRowBorder}` : ''}`}
                    >
                      <Typography className={styles.policyWindow}>{window}</Typography>
                      <Typography className={styles.policyRefund}>{refund}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography className={styles.policyNote}>
                  Note: Certain exclusive properties may have &ldquo;Non-Refundable&rdquo; or
                  &ldquo;Strict&rdquo; custom policies which will be clearly indicated during
                  checkout.
                </Typography>
              </Box>
            </Box>

            {/* Section 05 — Property Standards */}
            <Box component="section" id="property-standards" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>05</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  Property Standards
                </Typography>
              </Box>
              <Typography className={styles.body}>
                Lumina Stay maintains a curation of properties that meet our
                &ldquo;Five-Star Integrity&rdquo; benchmark. Hosts are required to maintain high
                standards of cleanliness, safety, and amenity availability. If a property
                significantly fails to meet the description provided at booking, Lumina
                Stay will intervene to provide an alternative or refund at our discretion.
              </Typography>
              <Box className={styles.tripleCardGrid}>
                {PROPERTY_CARDS.map(({ Icon, title, body }) => (
                  <Box key={title} className={styles.tripleCard}>
                    <Icon className={styles.tripleCardIcon} />
                    <Typography className={styles.tripleCardTitle}>{title}</Typography>
                    <Typography className={styles.tripleCardBody}>{body}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Section 06 — Liability & Indemnity */}
            <Box component="section" id="liability-indemnity" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>06</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  Liability &amp; Indemnity
                </Typography>
              </Box>
              <Typography className={styles.body}>
                To the maximum extent permitted by law, Lumina Stay shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages,
                including but not limited to loss of profits, data, goodwill, or other
                intangible losses resulting from your access to or use of (or inability
                to access or use) the Service.
              </Typography>
              <Typography className={styles.body}>
                You agree to indemnify, defend, and hold harmless Lumina Stay and its
                officers, directors, employees, agents, and licensors from and against
                any claims, liabilities, damages, judgments, awards, losses, costs,
                expenses, or fees (including reasonable attorney&rsquo;s fees) arising out of
                or relating to your violation of these Terms or your use of the Service.
              </Typography>
              <Typography className={styles.body}>
                These Terms shall be governed by and construed in accordance with the
                laws of the jurisdiction in which Lumina Stay operates, without regard
                to its conflict of law provisions.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
