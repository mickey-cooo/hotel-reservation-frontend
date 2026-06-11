'use client';

import { Box, Typography } from '@mui/material';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccess';
import styles from './CategoryFilter.module.scss';

const CATEGORIES = [
  { id: 'luxury', label: 'Luxury', Icon: DiamondOutlinedIcon },
  { id: 'family', label: 'Family Friendly', Icon: FamilyRestroomOutlinedIcon },
  { id: 'boutique', label: 'Boutique', Icon: StorefrontOutlinedIcon },
  { id: 'beachfront', label: 'Beachfront', Icon: BeachAccessOutlinedIcon },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onCategoryChange: (id: CategoryId) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <Box>
      <Typography variant="subtitle1" className={styles.title}>
        Categories
      </Typography>

      <Box className={styles.list}>
        {CATEGORIES.map(({ id, label, Icon }) => {
          const isActive = activeCategory === id;
          return (
            <Box
              key={id}
              onClick={() => onCategoryChange(id)}
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
    </Box>
  );
}
