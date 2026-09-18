'use client';

import { useState } from 'react';
import { Box, Container, Chip, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import type { HotelDetail, PhotoCategory } from '@/models/entity/hotel/hotel.model';
import styles from './PhotosPageContent.module.scss';

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;
const ALL_LABEL = 'All';
const CATEGORIES: PhotoCategory[] = ['Guest Rooms', 'Suites', 'Dining', 'Spa & Wellness', 'Poolside'];

interface PhotosPageContentProps {
  hotel: HotelDetail;
}

export default function PhotosPageContent({ hotel }: PhotosPageContentProps) {
  const { t } = useTranslation(['hotelDetail', 'common']);
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | typeof ALL_LABEL>(ALL_LABEL);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered =
    activeCategory === ALL_LABEL
      ? hotel.photos
      : hotel.photos.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const handleCategoryChange = (cat: PhotoCategory | typeof ALL_LABEL) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <Box className={styles.page}>
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: t('common:nav.home'), href: '/' },
            { label: t('common:nav.destinations'), href: '/destinations' },
            { label: hotel.name, href: `/destinations/${hotel.id}` },
            { label: t('hotelDetail:photosPage.allPhotos') },
          ]}
        />

        <Box className={styles.header}>
          <Typography variant="h3" className={styles.title}>
            {t('hotelDetail:photosPage.title')}
          </Typography>
          <Typography className={styles.subtitle}>
            {t('hotelDetail:photosPage.subtitle')}
          </Typography>
        </Box>

        <Box className={styles.filters}>
          {[ALL_LABEL, ...CATEGORIES].map((cat) => (
            <Chip
              key={cat}
              label={
                cat === ALL_LABEL
                  ? t('hotelDetail:photosPage.all')
                  : t(`hotelDetail:photosPage.categories.${cat}`)
              }
              onClick={() => handleCategoryChange(cat as PhotoCategory | typeof ALL_LABEL)}
              className={`${styles.chip}${activeCategory === cat ? ` ${styles.chipActive}` : ''}`}
            />
          ))}
        </Box>

        <Box className={styles.grid}>
          {visible.map((photo, index) => (
            <Box key={`${photo.url}-${index}`} className={styles.photoCell}>
              <Box
                component="img"
                src={photo.url}
                alt={`${hotel.name} — ${photo.category}`}
                className={styles.photo}
              />
            </Box>
          ))}
        </Box>

        {hasMore && (
          <Box className={styles.footer}>
            <IconButton
              className={styles.discoverBtn}
              onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
              aria-label={t('hotelDetail:photosPage.discoverMoreAria')}
            >
              <AddIcon />
            </IconButton>
            <Typography className={styles.discoverLabel}>
              {t('hotelDetail:photosPage.discoverMore')}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
