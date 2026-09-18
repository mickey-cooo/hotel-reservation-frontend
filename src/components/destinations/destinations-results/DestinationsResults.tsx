'use client';

import { Grid } from '@mui/material';
import FilterSidebar from '@/components/destinations/filter-sidebar/FilterSidebar';
import HotelGrid from '@/components/destinations/hotel-grid/HotelGrid';
import Reveal from '@/components/reveal/Reveal';
import type { Hotel, HotelCategory } from '@/models/entity/hotel/hotel.model';

interface DestinationsResultsProps {
  hotels: Hotel[];
  totalCount: number;
  activeCategory: HotelCategory | null;
  onCategoryChange: (category: HotelCategory | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

export default function DestinationsResults({
  hotels,
  totalCount,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedAmenities,
  onAmenitiesChange,
}: DestinationsResultsProps) {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 3 }}>
        <FilterSidebar
          priceRange={priceRange}
          onPriceChange={onPriceChange}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          selectedAmenities={selectedAmenities}
          onAmenitiesChange={onAmenitiesChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Reveal>
          <HotelGrid hotels={hotels} totalCount={totalCount} />
        </Reveal>
      </Grid>
    </Grid>
  );
}
