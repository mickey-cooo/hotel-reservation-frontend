import { hotelService } from '@/service/hotel/hotel.service';
import { hotelReviewService } from '@/service/hotel-review/hotel-review.service';
import { getServerAuthToken } from '@/service/server-auth';
import type { Hotel } from '@/components/destinations/hotel-card/HotelCard';
import type { HotelDetail, Room, Review } from '@/lib/hotel-data';

export interface ApiAddress {
  id: string;
  country: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  detail?: string;
}

export interface ApiHotelRoom {
  id: string;
  name: string;
  description: string;
  status: string;
  image?: string;
  price: number;
  capacity: number;
  policies: string[];
  amenities: string[];
  type: string;
}

export interface ApiHotel {
  id: string;
  name: string;
  description: string;
  image?: string;
  phoneNumber: string;
  email: string;
  website?: string;
  status: string;
  address?: ApiAddress;
  rooms?: ApiHotelRoom[];
}

export interface ApiHotelReview {
  id: string;
  title: string;
  description: string;
  rating: number;
  isAnonymous: boolean;
  isReply: boolean;
  createdBy: string;
  createdAt: string;
}

const AMENITY_LABELS: Record<string, string> = {
  wifi: 'Free WiFi',
  tv: 'TV',
  air_conditioning: 'Air Conditioning',
  minibar: 'Minibar',
  safe: 'Safe',
  private_bathroom: 'Private Bathroom',
  private_balcony: 'Private Balcony',
  private_terrace: 'Private Terrace',
};

function labelizeAmenity(value: string): string {
  return AMENITY_LABELS[value] ?? value;
}

function formatLocation(address?: ApiAddress): string {
  if (!address) return 'Location unavailable';
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
    features: [...room.amenities.map(labelizeAmenity), ...room.policies],
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
    author: review.isAnonymous ? 'Anonymous Guest' : 'Guest',
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

export async function getAllHotels(
  page?: number,
): Promise<{ hotels: Hotel[]; totalCount: number }> {
  const token = await getServerAuthToken();

  try {
    const res = await hotelService.findAll<FindAllHotelResponse>(
      { page },
      token,
    );
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
