'use client';

import { useState } from 'react';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useTranslation } from 'react-i18next';
import HotelCard from '../hotel-card/HotelCard';
import type { Hotel } from '@/models/entity/hotel/hotel.model';
import styles from './HotelGrid.module.scss';

interface HotelGridProps {
  hotels: Hotel[];
  totalCount: number;
}

export default function HotelGrid({ hotels, totalCount }: HotelGridProps) {
  const { t } = useTranslation('destinations');
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <Box>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h5" className={styles.gridTitle}>
            {t('grid.foundOf', { shown: hotels.length, total: totalCount })}
          </Typography>
          <Typography className={styles.gridSubtitle}>
            {t('grid.subtitle')}
          </Typography>
        </Box>

        <Box className={styles.viewToggle}>
          <Tooltip title={t('grid.gridView')}>
            <IconButton
              onClick={() => setView('grid')}
              size="small"
              className={`${styles.viewBtn}${view === 'grid' ? ` ${styles.viewBtnActive}` : ''}`}
            >
              <GridViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('grid.mapView')}>
            <IconButton
              onClick={() => setView('map')}
              size="small"
              className={`${styles.viewBtn}${view === 'map' ? ` ${styles.viewBtnActive}` : ''}`}
            >
              <MapOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {view === 'grid' ? (
        <Grid container spacing={2.5}>
          {hotels.map((hotel) => (
            <Grid key={hotel.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className={styles.mapPlaceholder}>
          <Typography className={styles.mapPlaceholderText}>
            {t('grid.mapComingSoon')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
