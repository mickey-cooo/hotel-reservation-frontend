'use client';

import { useState } from 'react';
import { Box, Container, Typography, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MailIcon from '@mui/icons-material/Mail';
import styles from './HelpCenterContent.module.scss';

const CATEGORIES = [
  {
    Icon: CalendarMonthIcon,
    title: 'Booking',
    desc: 'Reservations, cancellations, and modifications.',
  },
  {
    Icon: PaymentsIcon,
    title: 'Payment',
    desc: 'Refunds, billing methods, and receipts.',
  },
  {
    Icon: AccountCircleIcon,
    title: 'Account',
    desc: 'Security, profile settings, and Lumina Rewards.',
  },
  {
    Icon: ExploreIcon,
    title: 'Travel Advice',
    desc: 'Local guides, safety tips, and packing lists.',
  },
] as const;

const FAQS = [
  {
    question: 'What is the Lumina Stay cancellation policy?',
    answer:
      'Our standard cancellation policy allows for a full refund if the booking is cancelled at least 48 hours before the scheduled check-in time. For premium suites and certain promotional rates, a non-refundable policy may apply. Please refer to your booking confirmation email for specific terms related to your stay.',
  },
  {
    question: 'Can I pay for my booking with multiple credit cards?',
    answer:
      'Yes, Lumina Stay supports split payments for reservations over $1,000. You can distribute the balance across up to three different payment methods during the final step of the checkout process.',
  },
  {
    question: 'How do I access the Lumina Concierge service?',
    answer:
      'Once your booking is confirmed, you will find a "Concierge" tab in your mobile app dashboard. From there, you can chat live with our dedicated travel experts to book dining, arrange transportation, or request personalized local itineraries.',
  },
  {
    question: 'Are there any hidden fees for international travel advice?',
    answer:
      'Absolutely not. All travel advice, packing guides, and basic destination insights provided through the Support Center are complimentary for all Lumina Stay members.',
  },
] as const;

export default function HelpCenterContent() {
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
            How can we assist you?
          </Typography>
          <Typography className={styles.heroSubtitle}>
            Search our knowledge base or browse categories below to find answers to your travel
            inquiries.
          </Typography>
          <Box className={styles.searchBar}>
            <SearchIcon className={styles.searchIcon} />
            <InputBase
              className={styles.searchInput}
              placeholder="Search for topics, bookings, or advice..."
              inputProps={{ 'aria-label': 'search help center' }}
            />
            <Button className={styles.searchBtn} disableElevation>
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Category grid — overlaps hero bottom */}
      <Container maxWidth="lg">
        <Box className={styles.categoryGrid}>
          {CATEGORIES.map(({ Icon, title, desc }) => (
            <Box key={title} className={styles.categoryCard}>
              <Box className={styles.categoryIconWrap}>
                <Icon className={styles.categoryIcon} />
              </Box>
              <Typography className={styles.categoryTitle}>{title}</Typography>
              <Typography className={styles.categoryDesc}>{desc}</Typography>
            </Box>
          ))}
        </Box>

        {/* FAQ */}
        <Box className={styles.faqSection}>
          <Typography variant="h2" className={styles.faqHeading}>
            Frequently Asked Questions
          </Typography>
          <Box className={styles.faqList}>
            {FAQS.map(({ question, answer }, index) => (
              <Box key={question} className={styles.faqItem}>
                <button
                  className={styles.faqBtn}
                  onClick={() => handleFaqToggle(index)}
                  aria-expanded={openFaq === index}
                >
                  <Typography className={styles.faqQuestion}>{question}</Typography>
                  <ExpandMoreIcon
                    className={`${styles.faqChevron}${openFaq === index ? ` ${styles.faqChevronOpen}` : ''}`}
                  />
                </button>
                <Box
                  className={`${styles.faqAnswer}${openFaq === index ? ` ${styles.faqAnswerOpen}` : ''}`}
                >
                  <Typography className={styles.faqAnswerText}>{answer}</Typography>
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
              Still need assistance?
            </Typography>
            <Typography className={styles.ctaSubtitle}>
              Our global support team is available 24/7 to help you with any urgent travel needs or
              specialized requests.
            </Typography>
            <Box className={styles.ctaBtns}>
              <Button
                className={styles.ctaBtnPrimary}
                startIcon={<ChatBubbleIcon />}
                disableElevation
              >
                Live Chat Now
              </Button>
              <Button className={styles.ctaBtnOutline} startIcon={<MailIcon />}>
                Email Support
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
