import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import DestinationCard from '../destination-card/DestinationCard';
import type { Hotel } from '@/models/entity/hotel/hotel.model';
import styles from './MostBookedSection.module.scss';

interface MostBookedSectionProps {
  hotels: Hotel[];
}

export default function MostBookedSection({ hotels }: MostBookedSectionProps) {
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
          {hotels.map((hotel) => (
            <DestinationCard
              key={hotel.id}
              destination={{
                label: hotel.badge,
                name: hotel.name,
                location: hotel.location,
                rating: hotel.rating,
                price: hotel.price,
                imageUrl: hotel.imageUrl
                  ? hotel.imageUrl
                  : hotel.name.charAt(0),
              }}
              href={`/destinations/${hotel.id}`}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
