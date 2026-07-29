'use client';

import { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Slider, Typography } from '@mui/material';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccess';
import styles from './FilterSidebar.module.scss';

const CATEGORIES = [
  { id: 'luxury', label: 'Luxury', Icon: DiamondOutlinedIcon },
  { id: 'family', label: 'Family Friendly', Icon: FamilyRestroomOutlinedIcon },
  { id: 'boutique', label: 'Boutique', Icon: StorefrontOutlinedIcon },
  { id: 'beachfront', label: 'Beachfront', Icon: BeachAccessOutlinedIcon },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

const AMENITIES = ['Infinity Pool', 'Spa & Wellness', 'Michelin Star Dining'] as const;

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSidebar({ priceRange, onPriceChange }: FilterSidebarProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('luxury');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  }

  return (
    <Box>
      <Typography variant="subtitle1" className={styles.categoryTitle}>
        Categories
      </Typography>
      <Box className={styles.categoryList}>
        {CATEGORIES.map(({ id, label, Icon }) => {
          const isActive = activeCategory === id;
          return (
            <Box
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`${styles.categoryItem}${isActive ? ` ${styles.categoryItemActive}` : ''}`}
            >
              <Icon className={styles.categoryIcon} />
              <Typography
                className={`${styles.categoryLabel}${isActive ? ` ${styles.categoryLabelActive}` : ''}`}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Typography variant="subtitle1" className={styles.priceTitle}>
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

      <Typography variant="subtitle1" className={styles.amenitiesTitle}>
        Amenities
      </Typography>
      <Box className={styles.amenitiesList}>
        {AMENITIES.map((amenity) => (
          <FormControlLabel
            key={amenity}
            control={
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
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
