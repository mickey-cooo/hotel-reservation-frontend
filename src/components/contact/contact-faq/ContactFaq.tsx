'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './ContactFaq.module.scss';

const FAQS = [
  {
    question: 'Can I modify a booking via the contact form?',
    answer:
      'Yes, you can request modifications through this form. Please include your Booking ID in the message body. Our concierge team will process your request and confirm via email within 4 business hours.',
  },
  {
    question: 'How do I inquire about corporate group rates?',
    answer:
      'Select "Corporate Accounts" in the subject dropdown. Our dedicated business relations manager will provide you with a tailored portfolio of properties and bespoke pricing within 24 hours.',
  },
  {
    question: 'Is there a 24/7 emergency contact?',
    answer:
      'For active bookings with immediate on-site issues, please use the direct WhatsApp concierge number provided in your check-in digital packet. This form is monitored 8 AM to 10 PM EST.',
  },
] as const;

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <Box className={styles.root}>
      <Container maxWidth="md">
        <Box className={styles.header}>
          <Typography variant="h2" className={styles.heading}>
            Frequently Asked
          </Typography>
          <Typography className={styles.subheading}>
            Quick answers for our distinguished guests.
          </Typography>
        </Box>

        <Box className={styles.list}>
          {FAQS.map(({ question, answer }, index) => (
            <Box key={question} className={styles.item}>
              <button
                className={styles.btn}
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <Typography className={styles.question}>{question}</Typography>
                <ExpandMoreIcon
                  className={`${styles.chevron}${openIndex === index ? ` ${styles.chevronOpen}` : ''}`}
                />
              </button>
              <Box
                className={`${styles.answer}${openIndex === index ? ` ${styles.answerOpen}` : ''}`}
              >
                <Typography className={styles.answerText}>{answer}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
