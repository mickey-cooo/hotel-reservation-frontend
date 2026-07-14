import { Box, Container, Typography } from '@mui/material';
import styles from './ConciergeHero.module.scss';

export default function ConciergeHero() {
  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.inner}>
          <Typography component="p" className={styles.eyebrow}>
            24 / 7 Support
          </Typography>
          <Typography variant="h1" className={styles.heading}>
            How can we help?
          </Typography>
          <Typography className={styles.subtitle}>
            Our Lumina Concierge is available around the clock to assist with your journey — from
            suite upgrades to personalized itinerary planning.
          </Typography>
          <Box className={styles.divider} />
        </Box>
      </Container>
    </Box>
  );
}
