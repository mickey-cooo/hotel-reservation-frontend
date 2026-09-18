'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import styles from './ContactFaq.module.scss';

const FAQ_KEYS = ['q1', 'q2', 'q3'] as const;

export default function ContactFaq() {
  const { t } = useTranslation('contact');
  const [openIndex, setOpenIndex] = useState<number>(-1);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }

  return (
    <Box className={styles.root}>
      <Container maxWidth="md">
        <Box className={styles.header}>
          <Typography variant="h2" className={styles.heading}>
            {t('faq.heading')}
          </Typography>
          <Typography className={styles.subheading}>
            {t('faq.subheading')}
          </Typography>
        </Box>

        <Box className={styles.list}>
          {FAQ_KEYS.map((key, index) => (
            <Box key={key} className={styles.item}>
              <button
                className={styles.btn}
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <Typography className={styles.question}>{t(`faq.${key}`)}</Typography>
                <ExpandMoreIcon
                  className={`${styles.chevron}${openIndex === index ? ` ${styles.chevronOpen}` : ''}`}
                />
              </button>
              <Box
                className={`${styles.answer}${openIndex === index ? ` ${styles.answerOpen}` : ''}`}
              >
                <Typography className={styles.answerText}>{t(`faq.a${key.slice(1)}`)}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
