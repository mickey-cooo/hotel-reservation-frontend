export enum HotelRoomAmenities {
  WIFI = 'wifi',
  TV = 'tv',
  AIR_CONDITIONING = 'air_conditioning',
  MINIBAR = 'minibar',
  SAFE = 'safe',
  PRIVATE_BATHROOM = 'private_bathroom',
  PRIVATE_BALCONY = 'private_balcony',
  PRIVATE_TERRACE = 'private_terrace',
}

export const AMENITY_LABELS: Record<HotelRoomAmenities, string> = {
  [HotelRoomAmenities.WIFI]: 'Free WiFi',
  [HotelRoomAmenities.TV]: 'TV',
  [HotelRoomAmenities.AIR_CONDITIONING]: 'Air Conditioning',
  [HotelRoomAmenities.MINIBAR]: 'Minibar',
  [HotelRoomAmenities.SAFE]: 'Safe',
  [HotelRoomAmenities.PRIVATE_BATHROOM]: 'Private Bathroom',
  [HotelRoomAmenities.PRIVATE_BALCONY]: 'Private Balcony',
  [HotelRoomAmenities.PRIVATE_TERRACE]: 'Private Terrace',
};

// Rooms/hotels come back from the adapter with amenities already labelized
// (see hotel-adapter.ts's labelizeAmenity) rather than the raw enum value, so
// the UI needs this reverse lookup to translate them at render time.
export const AMENITY_LABEL_TO_VALUE: Record<string, HotelRoomAmenities> = Object.fromEntries(
  Object.entries(AMENITY_LABELS).map(([value, label]) => [label, value as HotelRoomAmenities]),
);

export enum RoomPolicyType {
  PETS = 'pets',
  CHILDREN = 'children',
  SMOKING = 'smoking',
  ADULTS = 'adults',
}

export const POLICY_LABELS: Record<RoomPolicyType, string> = {
  [RoomPolicyType.PETS]: 'Pet Friendly',
  [RoomPolicyType.CHILDREN]: 'Child Friendly',
  [RoomPolicyType.SMOKING]: 'Smoking Allowed',
  [RoomPolicyType.ADULTS]: 'Adults Only',
};

export const POLICY_LABEL_TO_VALUE: Record<string, RoomPolicyType> = Object.fromEntries(
  Object.entries(POLICY_LABELS).map(([value, label]) => [label, value as RoomPolicyType]),
);

// API entity (raw backend shape)
export interface ApiHotelRoom {
  id: string;
  hotel_id?: string;
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

// UI type
export interface Room {
  id: string;
  name: string;
  badge?: 'BESTSELLER' | 'FEATURED';
  capacity: { adults: number; children: number };
  sizeSqm: number;
  features: string[];
  price: number;
  imageUrl: string;
}

// Service DTOs
export interface CreateManyHotelRoomBodyDto {
  rooms: string[];
}

export interface UpdateHotelRoomBodyDto {
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  policies: string[];
  amenities: string[];
  type: string;
}

export interface FindAllHotelRoomQuery {
  hotel_id?: string[];
  checkInDate?: string;
  checkOutDate?: string;
  guestNumber?: number;
  roomCount?: number;
  price?: number;
  amenities?: string;
}
