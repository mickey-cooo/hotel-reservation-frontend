// API entity (raw backend shape)
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
  hotel_id?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestNumber?: number;
  roomCount?: number;
}
