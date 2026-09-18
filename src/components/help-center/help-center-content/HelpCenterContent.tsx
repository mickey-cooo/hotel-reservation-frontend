'use client';

import { useState } from 'react';
import { Box, Container, Typography, InputBase, Button } from '@mui/material';
import NextLink from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';
import styles from './HelpCenterContent.module.scss';

const CATEGORIES = [
  { Icon: CalendarMonthIcon, key: 'booking' },
  { Icon: PaymentsIcon, key: 'payment' },
  { Icon: AccountCircleIcon, key: 'account' },
  { Icon: ExploreIcon, key: 'travelAdvice' },
] as const;

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4'] as const;

export default function HelpCenterContent() {
  const { t } = useTranslation('helpCenter');
  const [openFaq, setOpenFaq] = useState<number>(0);

  const handleFaqToggle = (index: number) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  return (
    <Box className={styles.root}>
      {/* Hero */}
      <Box className={styles.hero}>
        <Box className={styles.heroBlobRight} aria-hidden />
        <Box className={styles.heroBlobLeft} aria-hidden />
        <Box className={styles.heroInner}>
          <Typography variant="h1" className={styles.heroTitle}>
            {t('hero.title')}
          </Typography>
          <Typography className={styles.heroSubtitle}>
            {t('hero.subtitle')}
          </Typography>
          <Box className={styles.searchBar}>
            <SearchIcon className={styles.searchIcon} />
            <InputBase
              className={styles.searchInput}
              placeholder={t('hero.searchPlaceholder')}
              inputProps={{ 'aria-label': t('hero.searchAriaLabel') }}
            />
            <Button className={styles.searchBtn} disableElevation>
              {t('hero.search')}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Category grid — overlaps hero bottom */}
      <Container maxWidth="lg">
        <Box className={styles.categoryGrid}>
          {CATEGORIES.map(({ Icon, key }) => (
            <Box key={key} className={styles.categoryCard}>
              <Box className={styles.categoryIconWrap}>
                <Icon className={styles.categoryIcon} />
              </Box>
              <Typography className={styles.categoryTitle}>{t(`categories.${key}Title`)}</Typography>
              <Typography className={styles.categoryDesc}>{t(`categories.${key}Desc`)}</Typography>
            </Box>
          ))}
        </Box>

        {/* FAQ */}
        <Box className={styles.faqSection}>
          <Typography variant="h2" className={styles.faqHeading}>
            {t('faq.heading')}
          </Typography>
          <Box className={styles.faqList}>
            {FAQ_KEYS.map((key, index) => (
              <Box key={key} className={styles.faqItem}>
                <button
                  className={styles.faqBtn}
                  onClick={() => handleFaqToggle(index)}
                  aria-expanded={openFaq === index}
                >
                  <Typography className={styles.faqQuestion}>{t(`faq.${key}`)}</Typography>
                  <ExpandMoreIcon
                    className={`${styles.faqChevron}${openFaq === index ? ` ${styles.faqChevronOpen}` : ''}`}
                  />
                </button>
                <Box
                  className={`${styles.faqAnswer}${openFaq === index ? ` ${styles.faqAnswerOpen}` : ''}`}
                >
                  <Typography className={styles.faqAnswerText}>{t(`faq.a${key.slice(1)}`)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* CTA */}
      <Container maxWidth="lg">
        <Box className={styles.cta}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
            alt=""
            aria-hidden
            className={styles.ctaBgImg}
          />
          <Box className={styles.ctaInner}>
            <Typography variant="h2" className={styles.ctaTitle}>
              {t('cta.title')}
            </Typography>
            <Typography className={styles.ctaSubtitle}>
              {t('cta.subtitle')}
            </Typography>
            <Box className={styles.ctaBtns}>
              <Button
                className={styles.ctaBtnPrimary}
                startIcon={<ChatBubbleIcon />}
                component={NextLink}
                href="/concierge"
                disableElevation
              >
                {t('cta.liveChat')}
              </Button>
              <Button className={styles.ctaBtnOutline} startIcon={<MailIcon />}>
                {t('cta.emailSupport')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
