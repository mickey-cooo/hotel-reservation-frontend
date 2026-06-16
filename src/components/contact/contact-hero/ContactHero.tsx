import { Box, Typography } from '@mui/material';
import styles from './ContactHero.module.scss';

export default function ContactHero() {
  return (
    <Box className={styles.root}>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80"
        alt=""
        aria-hidden
        className={styles.bg}
      />
      <Box className={styles.overlay} aria-hidden />
      <Box className={styles.content}>
        <Typography variant="h1" className={styles.title}>
          Concierge Services
        </Typography>
        <Typography className={styles.subtitle}>
          Personalized assistance for your global luxury stays. We are here to ensure every detail
          of your journey is perfect.
        </Typography>
      </Box>
    </Box>
  );
}
