'use client';

import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import styles from './AmenitiesFilter.module.scss';

const AMENITIES = ['Infinity Pool', 'Spa & Wellness', 'Michelin Star Dining'] as const;

interface AmenitiesFilterProps {
  selectedAmenities: string[];
  onToggle: (amenity: string) => void;
}

export default function AmenitiesFilter({ selectedAmenities, onToggle }: AmenitiesFilterProps) {
  return (
    <Box>
      <Typography variant="subtitle1" className={styles.title}>
        Amenities
      </Typography>

      <Box className={styles.list}>
        {AMENITIES.map((amenity) => (
          <FormControlLabel
            key={amenity}
            control={
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onChange={() => onToggle(amenity)}
                size="small"
                className={styles.checkbox}
              />
            }
            label={
              <Typography className={styles.checkboxLabel}>{amenity}</Typography>
            }
          />
        ))}
      </Box>
    </Box>
  );
}
