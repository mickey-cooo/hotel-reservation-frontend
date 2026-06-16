import { Box, Container, Typography } from '@mui/material';
import HeroSearchBar from '@/components/hero/hero-search-bar/HeroSearchBar';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <Box className={styles.hero}>
      <Container maxWidth="md" className={styles.heroContent}>
        <Typography className={styles.heroLabel}>
          LUXURY HOTEL BOOKING
        </Typography>
        <Typography variant="h1" className={styles.heroTitle}>
          Find Your Next Sanctuary
        </Typography>
        <Typography className={styles.heroSubtitle}>
          Handpicked properties. Unmatched service. Unforgettable stays.
        </Typography>
        <HeroSearchBar />
      </Container>
    </Box>
  );
}
