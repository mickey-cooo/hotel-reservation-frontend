import { Box, Container, Typography } from '@mui/material';
import DestinationsSearchBar from './DestinationsSearchBar';
import styles from './DestinationsHero.module.scss';

export default function DestinationsHero() {
  return (
    <Box className={styles.heroWrapper}>
      <Container maxWidth="md" className={styles.heroContent}>
        <Typography
          variant="h3"
          className={styles.heroTitle}
        >
          Discover Exceptional stays
        </Typography>
        <DestinationsSearchBar />
      </Container>
    </Box>
  );
}
