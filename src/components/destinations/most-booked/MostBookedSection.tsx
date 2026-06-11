import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import DestinationCard from '../destination-card/DestinationCard';
import styles from './MostBookedSection.module.scss';

const DESTINATIONS = [
  {
    id: '7',
    label: 'EXCLUSIVE',
    name: 'Azure Cliff Retreat',
    location: 'Santorini, Greece',
    rating: 4.9,
    price: 540,
    imageUrl:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
  },
  {
    id: '5',
    label: 'TOP CHOICE',
    name: 'Summit Peak Chalet',
    location: 'Zermatt, Switzerland',
    rating: 5.0,
    price: 890,
    imageUrl:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
  },
  {
    id: '3',
    label: 'EXCLUSIVE',
    name: 'Vayu Jungle Oasis',
    location: 'Ubud, Bali',
    rating: 4.8,
    price: 420,
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
  },
];

export default function MostBookedSection() {
  return (
    <Box className={styles.section}>
      <Container maxWidth="lg">
        <Typography variant="caption" className={styles.sectionLabel}>
          Our Curated Selection
        </Typography>

        <Box className={styles.sectionHeader}>
          <Typography variant="h5" className={styles.sectionTitle}>
            Most Booked Destinations
          </Typography>
          <NextLink href="/destinations" className={styles.viewAllLink}>
            <Button
              endIcon={<ArrowForwardIcon fontSize="small" />}
              className={styles.viewAllBtn}
            >
              View all destinations
            </Button>
          </NextLink>
        </Box>

        <Box className={styles.cardList}>
          {DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.name} destination={dest} href={`/destinations/${dest.id}`} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
