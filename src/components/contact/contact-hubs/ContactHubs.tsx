import { Box, Container, Typography } from '@mui/material';
import styles from './ContactHubs.module.scss';

const HUBS = [
  {
    city: 'London',
    role: 'European Headquarters',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
  },
  {
    city: 'Tokyo',
    role: 'Asia-Pacific Hub',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    city: 'Dubai',
    role: 'Middle East & Africa',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  },
] as const;

export default function ContactHubs() {
  return (
    <Box className={styles.root}>
      <Container maxWidth="lg">
        <Box className={styles.header}>
          <Typography variant="h2" className={styles.heading}>
            Our Regional Hubs
          </Typography>
          <Typography className={styles.subheading}>
            Wherever your destination, Lumina Stay provides local expertise and unparalleled service
            through our regional offices.
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {HUBS.map(({ city, role, img }) => (
            <Box key={city} className={styles.card}>
              <Box
                component="img"
                src={img}
                alt={`${city} skyline`}
                className={styles.cardImg}
              />
              <Box className={styles.cardOverlay} aria-hidden />
              <Box className={styles.cardBody}>
                <Typography className={styles.cardCity}>{city}</Typography>
                <Typography className={styles.cardRole}>{role}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
