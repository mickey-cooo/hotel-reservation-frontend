'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import CategoryFilter, { type CategoryId } from '@/components/destinations/category-filter/CategoryFilter';
import PriceRangeFilter from '@/components/destinations/price-range-filter/PriceRangeFilter';
import AmenitiesFilter from '@/components/destinations/amenities-filter/AmenitiesFilter';

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
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <PriceRangeFilter priceRange={priceRange} onPriceChange={onPriceChange} />
      <AmenitiesFilter selectedAmenities={selectedAmenities} onToggle={toggleAmenity} />
    </Box>
  );
}
