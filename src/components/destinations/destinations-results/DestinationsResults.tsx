'use client';

import { useState } from 'react';
import { Grid } from '@mui/material';
import FilterSidebar from '@/components/destinations/filter-sidebar/FilterSidebar';
import HotelGrid from '@/components/destinations/hotel-grid/HotelGrid';
import Reveal from '@/components/reveal/Reveal';
import type { Hotel } from '@/components/destinations/hotel-card/HotelCard';

interface DestinationsResultsProps {
  hotels: Hotel[];
  totalCount: number;
}

export default function DestinationsResults({ hotels, totalCount }: DestinationsResultsProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 2500]);

  const filteredHotels = hotels.filter(
    (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1],
  );

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 3 }}>
        <FilterSidebar priceRange={priceRange} onPriceChange={setPriceRange} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Reveal>
          <HotelGrid hotels={filteredHotels} totalCount={totalCount} />
        </Reveal>
      </Grid>
    </Grid>
  );
}
