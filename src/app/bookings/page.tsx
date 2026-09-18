'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/navbar/Navbar';
import BookingsContent from '@/components/bookings/bookings-content/BookingsContent';
import BookingBottomCta from '@/components/bookings/booking-bottom-cta/BookingBottomCta';
import Footer from '@/components/footer/Footer';
import styles from './page.module.scss';

export default function BookingsPage() {
  const { t } = useTranslation('bookings');

  return (
    <>
      <Navbar variant="light" />
      <Box className={styles.pageWrapper}>
        <Container maxWidth="lg">
          <Box className={styles.pageHeader}>
            <Typography variant="h4" className={styles.pageTitle}>
              {t('list.title')}
            </Typography>
            <Typography className={styles.pageSubtitle}>
              {t('list.subtitle')}
            </Typography>
          </Box>
          <BookingsContent />
          <BookingBottomCta />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
