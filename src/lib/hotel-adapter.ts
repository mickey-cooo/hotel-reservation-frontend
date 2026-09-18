import { hotelService } from '@/service/hotel/hotel.service';
import { hotelReviewService } from '@/service/hotel-review/hotel-review.service';
import { hotelRoomService } from '@/service/hotel-room/hotel-room.service';
import { getServerAuthToken } from '@/service/server-auth';
import type {
  ApiHotel,
  Hotel,
  HotelCategory,
  HotelDetail,
} from '@/models/entity/hotel/hotel.model';
import {
  AMENITY_LABELS,
  POLICY_LABELS,
} from '@/models/entity/hotel-room/hotel-room.model';
import type {
  ApiHotelRoom,
  Room,
} from '@/models/entity/hotel-room/hotel-room.model';
import type {
  ApiHotelReview,
  Review,
} from '@/models/entity/hotel-review/hotel-review.model';
import type { ApiAddress } from '@/models/entity/address/address.model';

function labelizeAmenity(value: string): string {
  return AMENITY_LABELS[value as keyof typeof AMENITY_LABELS] ?? value;
}

function labelizePolicy(value: string): string {
  return POLICY_LABELS[value as keyof typeof POLICY_LABELS] ?? value;
}

function formatLocation(address?: ApiAddress): string {
  if (!address) return '';
  return [address.district, address.province].filter(Boolean).join(', ');
}

function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function adaptRoom(room: ApiHotelRoom): Room {
  return {
    id: room.id,
    name: room.name,
    capacity: { adults: room.capacity, children: 0 },
    sizeSqm: 0,
    features: [
      ...room.amenities.map(labelizeAmenity),
      ...room.policies.map(labelizePolicy),
    ],
    price: room.price,
    imageUrl: room.image ?? '',
  };
}

export function averageRating(reviews: ApiHotelReview[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}

export function cheapestRoomPrice(rooms: ApiHotelRoom[]): number {
  if (rooms.length === 0) return 0;
  return Math.min(...rooms.map((r) => r.price));
}

export function adaptHotelCard(hotel: ApiHotel, rating = 0): Hotel {
  const rooms = hotel.rooms ?? [];
  return {
    id: hotel.id,
    name: hotel.name,
    location: formatLocation(hotel.address),
    rating,
    price: cheapestRoomPrice(rooms),
    imageUrl: hotel.image ?? '',
  };
}

export function adaptHotelDetail(
  hotel: ApiHotel,
  reviews: ApiHotelReview[] = [],
): HotelDetail {
  const rooms = hotel.rooms ?? [];
  const rating = averageRating(reviews);

  const adaptedReviews: Review[] = reviews.map((review) => ({
    id: review.id,
    author: review.isAnonymous ? 'anonymous' : 'guest',
    date: formatReviewDate(review.createdAt),
    rating: review.rating,
    comment: review.description,
  }));

  const amenitySet = new Set<string>();
  rooms.forEach((room) =>
    room.amenities.forEach((a) => amenitySet.add(labelizeAmenity(a))),
  );

  return {
    id: hotel.id,
    name: hotel.name,
    location: formatLocation(hotel.address),
    rating,
    price: cheapestRoomPrice(rooms),
    imageUrl: hotel.image ?? '',
    description: hotel.description,
    reviewCount: reviews.length,
    galleryImages: hotel.image ? [hotel.image] : [],
    amenities: Array.from(amenitySet),
    rooms: rooms.map(adaptRoom),
    reviews: adaptedReviews,
    photos: [],
  };
}

interface FindOneHotelResponse {
  message: string;
  data: ApiHotel;
}

interface FindAllHotelReviewResponse {
  data?: ApiHotelReview[];
}

interface FindAllHotelResponse {
  data: ApiHotel[];
  meta: { totalItems: number };
}

export interface RoomFilters {
  price?: number;
  amenities?: string[];
  checkInDate?: string;
  checkOutDate?: string;
  guestNumber?: number;
}

function hasRoomFilters(filters?: RoomFilters): filters is RoomFilters {
  if (!filters) return false;
  return Boolean(
    filters.price ||
      filters.amenities?.length ||
      (filters.checkInDate && filters.checkOutDate) ||
      filters.guestNumber,
  );
}

export async function getHotelIdsMatchingRoomFilters(
  filters: RoomFilters,
): Promise<Set<string>> {
  try {
    const rooms = await hotelRoomService.findAll<ApiHotelRoom[]>({
      price: filters.price,
      amenities: filters.amenities?.join(','),
      checkInDate: filters.checkInDate,
      checkOutDate: filters.checkOutDate,
      guestNumber: filters.guestNumber,
    });
    return new Set(
      rooms.map((room) => room.hotel_id).filter((id): id is string => Boolean(id)),
    );
  } catch {
    return new Set();
  }
}

// Room-filter matching needs every category-matching hotel in hand before it can
// filter and count correctly, so it pulls the whole category in one shot rather
// than intersecting a single backend page against the (unpaginated) match set.
const ALL_HOTELS_LIMIT = 1000;

export async function getAllHotels(
  page?: number,
  limit?: number,
  category?: HotelCategory,
  roomFilters?: RoomFilters,
): Promise<{ hotels: Hotel[]; totalCount: number }> {
  try {
    if (hasRoomFilters(roomFilters)) {
      const [res, matchingHotelIds] = await Promise.all([
        hotelService.findAll<FindAllHotelResponse>({
          limit: ALL_HOTELS_LIMIT,
          category,
        }),
        getHotelIdsMatchingRoomFilters(roomFilters),
      ]);

      const filtered = res.data.filter((hotel) => matchingHotelIds.has(hotel.id));
      const paged = limit
        ? filtered.slice(((page ?? 1) - 1) * limit, ((page ?? 1) - 1) * limit + limit)
        : filtered;

      return {
        hotels: paged.map((hotel) => adaptHotelCard(hotel)),
        totalCount: filtered.length,
      };
    }

    const res = await hotelService.findAll<FindAllHotelResponse>({
      page,
      limit,
      category,
    });

    return {
      hotels: res.data.map((hotel) => adaptHotelCard(hotel)),
      totalCount: res.meta.totalItems,
    };
  } catch {
    return { hotels: [], totalCount: 0 };
  }
}

export async function getHotelById(
  id: string,
): Promise<HotelDetail | undefined> {
  const token = await getServerAuthToken();

  try {
    const [hotelRes, reviewsRes] = await Promise.all([
      hotelService.findOne<FindOneHotelResponse>(id, token),
      hotelReviewService
        .findAll<
          ApiHotelReview[] | FindAllHotelReviewResponse
        >({ hotel_id: id }, token)
        .catch(() => []),
    ]);

    const reviews = Array.isArray(reviewsRes)
      ? reviewsRes
      : (reviewsRes?.data ?? []);

    return adaptHotelDetail(hotelRes.data, reviews);
  } catch {
    return undefined;
  }
}
