'use client';

import { useState } from 'react';
import { Grid } from '@mui/material';
import FilterSidebar from '@/components/destinations/filter-sidebar/FilterSidebar';
import HotelGrid from '@/components/destinations/hotel-grid/HotelGrid';
import Reveal from '@/components/reveal/Reveal';
import type { Hotel } from '@/models/entity/hotel/hotel.model';

interface DestinationsResultsProps {
  hotels: Hotel[];
}

export default function DestinationsResults({
  hotels,
}: DestinationsResultsProps) {
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const activePriceRange = priceRange ?? [0, 3000];
  const filteredHotels = hotels.filter(
    (hotel) =>
      priceRange === null ||
      hotel.price === 0 ||
      (hotel.price >= priceRange[0] && hotel.price <= priceRange[1]),
  );

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 3 }}>
        <FilterSidebar priceRange={activePriceRange} onPriceChange={setPriceRange} />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Reveal>
          <HotelGrid hotels={filteredHotels} totalCount={hotels.length} />
        </Reveal>
      </Grid>
    </Grid>
  );
}
