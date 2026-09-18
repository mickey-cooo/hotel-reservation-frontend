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
import { useTranslation } from 'react-i18next';

const TABLE_OF_CONTENTS = [
  { id: 'acceptance-of-terms', key: 'acceptanceTitle' },
  { id: 'user-responsibilities', key: 'responsibilitiesTitle' },
  { id: 'booking-rules', key: 'bookingTitle' },
  { id: 'cancellation-policies', key: 'cancellationTitle' },
  { id: 'property-standards', key: 'propertyTitle' },
  { id: 'liability-indemnity', key: 'liabilityTitle' },
] as const;

type SectionId = (typeof TABLE_OF_CONTENTS)[number]['id'];

const RESPONSIBILITY_CARDS = [AccountCircleOutlinedIcon, SecurityOutlinedIcon] as const;

const BOOKING_ITEMS = [PaymentsOutlinedIcon, GroupOutlinedIcon] as const;

const REFUND_TIERS = [0, 1, 2];

const PROPERTY_CARDS = [CleanHandsOutlinedIcon, CheckCircleOutlinedIcon, SupportAgentOutlinedIcon] as const;

export default function TermsContent() {
  const { t } = useTranslation('terms');
  const responsibilities = t('responsibilities', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const bookingItems = t('bookingItems', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const refundTiers = t('refundTiers', { returnObjects: true }) as Array<{ window: string; refund: string }>;
  const propertyCards = t('propertyCards', { returnObjects: true }) as Array<{ title: string; body: string }>;
  const tocLabels = t('toc', { returnObjects: true }) as string[];
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
          <Typography className={styles.badgeText}>{t('badge')}</Typography>
          </Box>
          <Typography variant="h1" className={styles.pageTitle}>
            {t('title')}
          </Typography>
          <Typography className={styles.intro}>
            {t('intro')}
          </Typography>
        </Box>

        {/* Grid: TOC sidebar + content */}
        <Box className={styles.grid}>
          {/* Sticky TOC */}
          <Box component="aside" className={styles.tocAside}>
            <Box className={styles.tocSticky}>
              <Typography className={styles.tocLabel}>{t('contents')}</Typography>
              <nav>
                <Box className={styles.tocNav}>
                  {TABLE_OF_CONTENTS.map(({ id }, index) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`${styles.tocLink}${activeId === id ? ` ${styles.tocLinkActive}` : ''}`}
                      onClick={() => handleTocClick(id)}
                    >
                      {index + 1}. {tocLabels[index]}
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
                  {t('sections.acceptanceTitle')}
                </Typography>
              </Box>
              <Typography className={styles.body}>
                {t('sections.acceptanceBody1')}
              </Typography>
              <Typography className={styles.body}>
                {t('sections.acceptanceBody2')}
              </Typography>
            </Box>

            {/* Section 02 — User Responsibilities */}
            <Box component="section" id="user-responsibilities" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>02</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  {t('sections.responsibilitiesTitle')}
                </Typography>
              </Box>
              <Box className={styles.cardGrid}>
                {RESPONSIBILITY_CARDS.map((Icon, index) => (
                  <Box key={index} className={styles.card}>
                    <Icon className={styles.cardIcon} />
                    <Typography className={styles.cardTitle}>{responsibilities[index].title}</Typography>
                    <Typography className={styles.cardBody}>{responsibilities[index].body}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Quote image */}
            <Box className={styles.quoteWrap}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
                alt={t('common:imageAlt.lobby')}
                className={styles.quoteImg}
              />
              <Box className={styles.quoteOverlay}>
                <Typography className={styles.quoteText}>
                  {t('sections.quote')}
                </Typography>
              </Box>
            </Box>

            {/* Section 03 — Booking Rules */}
            <Box component="section" id="booking-rules" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>03</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  {t('sections.bookingTitle')}
                </Typography>
              </Box>
              <Box className={styles.iconItemList}>
                {BOOKING_ITEMS.map((Icon, index) => (
                  <Box key={index} className={styles.iconItem}>
                    <Box className={styles.iconCircle}>
                      <Icon className={styles.iconCircleIcon} />
                    </Box>
                    <Box>
                      <Typography className={styles.iconItemTitle}>{bookingItems[index].title}</Typography>
                      <Typography className={styles.iconItemBody}>{bookingItems[index].body}</Typography>
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
                  {t('sections.cancellationTitle')}
                </Typography>
              </Box>
              <Box className={styles.policyCard}>
                <Typography className={styles.policyTitle}>
                  {t('sections.policyTitle')}
                </Typography>
                <Box>
                  {REFUND_TIERS.map((tierIndex, index) => (
                    <Box
                      key={tierIndex}
                      className={`${styles.policyRow}${index < REFUND_TIERS.length - 1 ? ` ${styles.policyRowBorder}` : ''}`}
                    >
                      <Typography className={styles.policyWindow}>{refundTiers[tierIndex].window}</Typography>
                      <Typography className={styles.policyRefund}>{refundTiers[tierIndex].refund}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography className={styles.policyNote}>
                  {t('sections.policyNote')}
                </Typography>
              </Box>
            </Box>

            {/* Section 05 — Property Standards */}
            <Box component="section" id="property-standards" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>05</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  {t('sections.propertyTitle')}
                </Typography>
              </Box>
              <Typography className={styles.body}>
                {t('sections.propertyBody')}
              </Typography>
              <Box className={styles.tripleCardGrid}>
                {PROPERTY_CARDS.map((Icon, index) => (
                  <Box key={index} className={styles.tripleCard}>
                    <Icon className={styles.tripleCardIcon} />
                    <Typography className={styles.tripleCardTitle}>{propertyCards[index].title}</Typography>
                    <Typography className={styles.tripleCardBody}>{propertyCards[index].body}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Section 06 — Liability & Indemnity */}
            <Box component="section" id="liability-indemnity" className={styles.section}>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionNum}>06</Typography>
                <Typography variant="h2" className={styles.sectionTitle}>
                  {t('sections.liabilityTitle')}
                </Typography>
              </Box>
              <Typography className={styles.body}>
                {t('sections.liabilityBody1')}
              </Typography>
              <Typography className={styles.body}>
                {t('sections.liabilityBody2')}
              </Typography>
              <Typography className={styles.body}>
                {t('sections.liabilityBody3')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
