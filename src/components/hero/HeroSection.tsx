import { Box, Container, Typography } from '@mui/material';
import HeroSearchBar from '@/components/hero/hero-search-bar/HeroSearchBar';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <Box className={styles.hero}>
      <Container maxWidth="md" className={styles.heroContent}>
        <Typography variant="h2" className={styles.heroTitle}>
          Find Your Next Sanctuary
        </Typography>
        <HeroSearchBar />
      </Container>
    </Box>
  );
}
