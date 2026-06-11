import { Box, Container, Typography } from '@mui/material';
import Navbar from '@/components/navbar/Navbar';
import BookingsContent from '@/components/bookings/bookings-content/BookingsContent';
import BookingBottomCta from '@/components/bookings/booking-bottom-cta/BookingBottomCta';
import Footer from '@/components/footer/Footer';
import styles from './page.module.scss';

export default function BookingsPage() {
  return (
    <>
      <Navbar variant="light" />
      <Box className={styles.pageWrapper}>
        <Container maxWidth="lg">
          <Box className={styles.pageHeader}>
            <Typography variant="h4" className={styles.pageTitle}>
              My Bookings
            </Typography>
            <Typography className={styles.pageSubtitle}>
              Manage your upcoming retreats and revisit your past luxury
              experiences across the globe.
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
