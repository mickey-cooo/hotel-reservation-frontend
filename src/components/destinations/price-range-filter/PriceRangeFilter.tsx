'use client';

import { Box, Slider, Typography } from '@mui/material';
import styles from './PriceRangeFilter.module.scss';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({ priceRange, onPriceChange }: PriceRangeFilterProps) {
  return (
    <Box>
      <Typography variant="subtitle1" className={styles.title}>
        Price Range
      </Typography>

      <Box className={styles.sliderWrapper}>
        <Slider
          value={priceRange}
          onChange={(_, val) => onPriceChange(val as [number, number])}
          min={0}
          max={3000}
          valueLabelDisplay="off"
          className={styles.slider}
        />
        <Box className={styles.priceLabels}>
          <Typography className={styles.priceLabel}>
            ${priceRange[0].toLocaleString()}
          </Typography>
          <Typography className={styles.priceLabel}>
            ${priceRange[1] >= 3000 ? '2,500+' : priceRange[1].toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
