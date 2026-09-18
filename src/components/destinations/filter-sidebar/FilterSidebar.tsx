'use client';

import { Box, Button, Checkbox, FormControlLabel, Slider, Typography } from '@mui/material';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccess';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useTranslation } from 'react-i18next';
import { HotelCategory } from '@/models/entity/hotel/hotel.model';
import { HotelRoomAmenities } from '@/models/entity/hotel-room/hotel-room.model';
import styles from './FilterSidebar.module.scss';

const CATEGORIES: readonly {
  id: HotelCategory | null;
  key: string;
  Icon: typeof DiamondOutlinedIcon;
}[] = [
  { id: null, key: 'categoryAll', Icon: AppsOutlinedIcon },
  { id: HotelCategory.LUXURY, key: 'categoryLuxury', Icon: DiamondOutlinedIcon },
  {
    id: HotelCategory.FAMILY_FRIENDLY,
    key: 'categoryFamilyFriendly',
    Icon: FamilyRestroomOutlinedIcon,
  },
  { id: HotelCategory.BOUTIQUE, key: 'categoryBoutique', Icon: StorefrontOutlinedIcon },
  { id: HotelCategory.BEACHFRONT, key: 'categoryBeachfront', Icon: BeachAccessOutlinedIcon },
];

const AMENITIES = Object.values(HotelRoomAmenities);

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  activeCategory: HotelCategory | null;
  onCategoryChange: (category: HotelCategory | null) => void;
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

export default function FilterSidebar({
  priceRange,
  onPriceChange,
  activeCategory,
  onCategoryChange,
  selectedAmenities,
  onAmenitiesChange,
}: FilterSidebarProps) {
  const { t } = useTranslation('destinations');

  function toggleAmenity(amenity: string) {
    onAmenitiesChange(
      selectedAmenities.includes(amenity)
        ? selectedAmenities.filter((a) => a !== amenity)
        : [...selectedAmenities, amenity],
    );
  }

  return (
    <Box>
      <Typography variant="subtitle1" className={styles.categoryTitle}>
        {t('filters.categories')}
      </Typography>
      <Box className={styles.categoryList}>
        {CATEGORIES.map(({ id, key, Icon }) => {
          const isActive = activeCategory === id;
          return (
            <Box
              key={id ?? 'all'}
              onClick={() => onCategoryChange(id)}
              className={`${styles.categoryItem}${isActive ? ` ${styles.categoryItemActive}` : ''}`}
            >
              <Icon className={styles.categoryIcon} />
              <Typography
                className={`${styles.categoryLabel}${isActive ? ` ${styles.categoryLabelActive}` : ''}`}
              >
                {t(`filters.${key}`)}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Typography variant="subtitle1" className={styles.priceTitle}>
        {t('filters.priceRange')}
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

      <Box className={styles.amenitiesHeader}>
        <Typography variant="subtitle1" className={styles.amenitiesTitle}>
          {t('filters.amenities')}
        </Typography>
        {selectedAmenities.length > 0 && (
          <Button
            onClick={() => onAmenitiesChange([])}
            className={styles.clearAmenitiesBtn}
          >
            {t('filters.clearAll')}
          </Button>
        )}
      </Box>
      <Box className={styles.amenitiesList}>
        {AMENITIES.map((value) => (
          <FormControlLabel
            key={value}
            control={
              <Checkbox
                checked={selectedAmenities.includes(value)}
                onChange={() => toggleAmenity(value)}
                size="small"
                className={styles.checkbox}
              />
            }
            label={
              <Typography className={styles.checkboxLabel}>{t(`amenities.${value}`)}</Typography>
            }
          />
        ))}
      </Box>
    </Box>
  );
}
