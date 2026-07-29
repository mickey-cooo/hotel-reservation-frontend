// Service DTOs
export interface CreateHotelBookingBodyDto {
  hotel_id: string;
  room_id: string;
  guestCount: number;
  stayPeriod: number;
  paymentMethod: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface UpdateHotelBookingBodyDto {
  hotel_id: string;
  room_id: string;
  guestCount: number;
  stayPeriod: number;
  checkInDate: string;
  checkOutDate: string;
  paymentMethod: string;
}

export interface RefundBookingBodyDto {
  bookingId: string;
  reason: string;
}
