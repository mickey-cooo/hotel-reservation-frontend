'use server';

import { getAllHotels, getHotelById } from '@/lib/hotel-adapter';
import type { RoomFilters } from '@/lib/hotel-adapter';
import type {
  Hotel,
  HotelCategory,
  HotelDetail,
} from '@/models/entity/hotel/hotel.model';

export async function getAllHotelsAction(
  page?: number,
  limit?: number,
  category?: HotelCategory,
  roomFilters?: RoomFilters,
): Promise<{ hotels: Hotel[]; totalCount: number }> {
  return getAllHotels(page, limit, category, roomFilters);
}

export async function getHotelByIdAction(
  id: string,
): Promise<HotelDetail | undefined> {
  return getHotelById(id);
}
