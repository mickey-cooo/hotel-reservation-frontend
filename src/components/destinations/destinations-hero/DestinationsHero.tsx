'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DestinationsSearchBar, {
  type DestinationsSearchValues,
} from '@/components/destinations/destinations-search-bar/DestinationsSearchBar';
import styles from './DestinationsHero.module.scss';

interface DestinationsHeroProps {
  initialLocation?: string;
  initialCheckIn?: string | null;
  initialCheckOut?: string | null;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
  onSearch: (values: DestinationsSearchValues) => void;
}

export default function DestinationsHero({
  initialLocation,
  initialCheckIn,
  initialCheckOut,
  initialAdults,
  initialChildren,
  initialRooms,
  onSearch,
}: DestinationsHeroProps) {
  const { t } = useTranslation('destinations');

  return (
    <Box className={styles.heroWrapper}>
      <Container maxWidth="md" className={styles.heroContent}>
        <Typography
          variant="h3"
          className={styles.heroTitle}
        >
          {t('hero.title')}
        </Typography>
        <DestinationsSearchBar
          initialLocation={initialLocation}
          initialCheckIn={initialCheckIn}
          initialCheckOut={initialCheckOut}
          initialAdults={initialAdults}
          initialChildren={initialChildren}
          initialRooms={initialRooms}
          onSearch={onSearch}
        />
      </Container>
    </Box>
  );
}
