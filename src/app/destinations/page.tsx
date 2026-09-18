'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Container } from '@mui/material';
import DestinationsHero from '@/components/destinations/destinations-hero/DestinationsHero';
import DestinationsResults from '@/components/destinations/destinations-results/DestinationsResults';
import type { DestinationsSearchValues } from '@/components/destinations/destinations-search-bar/DestinationsSearchBar';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { getAllHotelsAction } from '@/lib/hotel-actions';
import { HotelCategory } from '@/models/entity/hotel/hotel.model';
import type { Hotel } from '@/models/entity/hotel/hotel.model';
import styles from './page.module.scss';

const MAX_PRICE = 3000;
const PRICE_DEBOUNCE_MS = 400;

function isHotelCategory(value: string | null): value is HotelCategory {
  return Object.values(HotelCategory).includes(value as HotelCategory);
}

function parseNumberParam(value: string | null, fallback: number): number {
  const parsed = value === null ? NaN : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function DestinationsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const activeCategory = isHotelCategory(categoryParam) ? categoryParam : null;

  const locationQuery = searchParams.get('location') ?? '';
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = parseNumberParam(searchParams.get('adults'), 1);
  const children = parseNumberParam(searchParams.get('children'), 0);
  const rooms = parseNumberParam(searchParams.get('rooms'), 1);
  const maxPriceParam = parseNumberParam(searchParams.get('maxPrice'), MAX_PRICE);
  const amenitiesParam = searchParams.get('amenities');
  const selectedAmenities = useMemo(
    () => (amenitiesParam ? amenitiesParam.split(',').filter(Boolean) : []),
    [amenitiesParam],
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPriceParam]);
  const [syncedMaxPrice, setSyncedMaxPrice] = useState(maxPriceParam);
  if (maxPriceParam !== syncedMaxPrice) {
    setSyncedMaxPrice(maxPriceParam);
    setPriceRange(([min]) => [Math.min(min, maxPriceParam), maxPriceParam]);
  }

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  useEffect(() => {
    let cancelled = false;
    const guestNumber = adults + children;

    async function fetchHotels() {
      const roomFilters = {
        price: maxPriceParam < MAX_PRICE ? maxPriceParam : undefined,
        amenities: selectedAmenities.length ? selectedAmenities : undefined,
        checkInDate: checkIn ?? undefined,
        checkOutDate: checkOut ?? undefined,
        guestNumber: guestNumber > 1 ? guestNumber : undefined,
      };

      const firstPage = await getAllHotelsAction(
        undefined,
        undefined,
        activeCategory ?? undefined,
        roomFilters,
      );
      if (cancelled) return;

      let allHotels = firstPage.hotels;
      let total = firstPage.totalCount;
      if (firstPage.hotels.length < firstPage.totalCount) {
        const nextPage = await getAllHotelsAction(
          1,
          firstPage.totalCount,
          activeCategory ?? undefined,
          roomFilters,
        );
        if (cancelled) return;
        allHotels = nextPage.hotels;
        total = nextPage.totalCount;
      }

      const trimmedLocation = locationQuery.trim().toLowerCase();
      const filtered = trimmedLocation
        ? allHotels.filter((hotel) =>
            hotel.location.toLowerCase().includes(trimmedLocation),
          )
        : allHotels;

      setHotels(filtered);
      setTotalCount(trimmedLocation ? filtered.length : total);
      setLoading(false);
      setHasLoadedOnce(true);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- must show the spinner synchronously on the very first load, before the fetch resolves
    setLoading(true);
    void fetchHotels();

    return () => {
      cancelled = true;
    };
  }, [
    activeCategory,
    locationQuery,
    checkIn,
    checkOut,
    adults,
    children,
    maxPriceParam,
    selectedAmenities,
  ]);

  function handleCategoryChange(category: HotelCategory | null) {
    updateParams({ category });
  }

  function handleAmenitiesChange(amenities: string[]) {
    updateParams({ amenities: amenities.length ? amenities.join(',') : null });
  }

  function handlePriceChange(range: [number, number]) {
    setPriceRange(range);
  }

  useEffect(() => {
    if (priceRange[1] === maxPriceParam) return;
    const timeout = setTimeout(() => {
      updateParams({
        maxPrice: priceRange[1] < MAX_PRICE ? String(priceRange[1]) : null,
      });
    }, PRICE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-arm the debounce when the slider value itself changes
  }, [priceRange]);

  function handleSearch(values: DestinationsSearchValues) {
    updateParams({
      location: values.location || null,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      adults: values.adults !== 1 ? String(values.adults) : null,
      children: values.children !== 0 ? String(values.children) : null,
      rooms: values.rooms !== 1 ? String(values.rooms) : null,
    });
  }

  return (
    <>
      <Navbar />
      <DestinationsHero
        initialLocation={locationQuery}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialAdults={adults}
        initialChildren={children}
        initialRooms={rooms}
        onSearch={handleSearch}
      />
      <Box className={styles.pageContent}>
        <Container maxWidth="lg">
          {loading && !hasLoadedOnce ? (
            <Box className={styles.loadingContainer}>
              <CircularProgress />
            </Box>
          ) : (
            <DestinationsResults
              hotels={hotels}
              totalCount={totalCount}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              selectedAmenities={selectedAmenities}
              onAmenitiesChange={handleAmenitiesChange}
            />
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense
      fallback={
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      }
    >
      <DestinationsPageContent />
    </Suspense>
  );
}
