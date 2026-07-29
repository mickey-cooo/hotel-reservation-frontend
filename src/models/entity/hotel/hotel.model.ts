import type {
  ApiHotelRoom,
  Room,
} from '@/models/entity/hotel-room/hotel-room.model';
import type { ApiAddress } from '@/models/entity/address/address.model';
import type { Review } from '@/models/entity/hotel-review/hotel-review.model';

export interface HotelInterface {
  id: number;
  name: string;
}

// UI types
export type PhotoCategory =
  | 'Guest Rooms'
  | 'Suites'
  | 'Dining'
  | 'Spa & Wellness'
  | 'Poolside';

export interface GalleryPhoto {
  url: string;
  category: PhotoCategory;
}

export interface Hotel {
  id: string;
  badge?: 'TRENDING' | 'FEATURED' | 'EXCLUSIVE';
  name: string;
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
}

export interface HotelDetail extends Hotel {
  description: string;
  reviewCount: number;
  galleryImages: string[];
  amenities: string[];
  rooms: Room[];
  reviews: Review[];
  photos: GalleryPhoto[];
}

// API entity (raw backend shape)
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

// Service DTOs
export interface AddressDto {
  country: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  detail: string;
}

export interface UpdateHotelRoomInHotelDto {
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  policies: string[];
  amenities: string[];
  type: string;
  roomId: string;
}

export interface CreateHotelBodyDto {
  name: string;
  description: string;
  image: string;
  phoneNumber: string;
  email: string;
  website: string;
  addressDetail: AddressDto;
  rooms: string[];
}

export interface UpdateHotelBodyDto {
  name: string;
  description: string;
  image: string;
  phoneNumber: string;
  email: string;
  website: string;
  addressDetail: AddressDto;
  rooms: UpdateHotelRoomInHotelDto[];
}

export type HotelCategory =
  | 'luxury'
  | 'family_friendly'
  | 'boutique'
  | 'beachfront';

export interface FindAllHotelQuery {
  page?: number;
  limit?: number;
  price?: string;
  rating?: string;
  amenities?: string;
  category?: HotelCategory;
}
