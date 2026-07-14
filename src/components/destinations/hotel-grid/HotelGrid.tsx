'use client';

import { useState } from 'react';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import HotelCard from '../hotel-card/HotelCard';
import type { Hotel } from '../hotel-card/HotelCard';
import styles from './HotelGrid.module.scss';

interface HotelGridProps {
  hotels: Hotel[];
  totalCount: number;
}

export default function HotelGrid({ hotels, totalCount }: HotelGridProps) {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <Box>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h5" className={styles.gridTitle}>
            Found {hotels.length} of {totalCount} stays
          </Typography>
          <Typography className={styles.gridSubtitle}>
            Showing premium results for your search.
          </Typography>
        </Box>

        <Box className={styles.viewToggle}>
          <Tooltip title="Grid view">
            <IconButton
              onClick={() => setView('grid')}
              size="small"
              className={`${styles.viewBtn}${view === 'grid' ? ` ${styles.viewBtnActive}` : ''}`}
            >
              <GridViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Map view">
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
            Map view coming soon
          </Typography>
        </Box>
      )}
    </Box>
  );
}
