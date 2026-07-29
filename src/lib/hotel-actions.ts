'use server';

import { getAllHotels, getHotelById } from '@/lib/hotel-adapter';
import type { Hotel, HotelDetail } from '@/models/entity/hotel/hotel.model';

export async function getAllHotelsAction(
  page?: number,
  limit?: number,
): Promise<{ hotels: Hotel[]; totalCount: number }> {
  return getAllHotels(page, limit);
}

export async function getHotelByIdAction(
  id: string,
): Promise<HotelDetail | undefined> {
  return getHotelById(id);
}
