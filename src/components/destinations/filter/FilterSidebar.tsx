'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import CategoryFilter, { type CategoryId } from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import AmenitiesFilter from './AmenitiesFilter';

export default function FilterSidebar() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('luxury');
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 2500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  }

  return (
    <Box>
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <PriceRangeFilter priceRange={priceRange} onPriceChange={setPriceRange} />
      <AmenitiesFilter selectedAmenities={selectedAmenities} onToggle={toggleAmenity} />
    </Box>
  );
}
