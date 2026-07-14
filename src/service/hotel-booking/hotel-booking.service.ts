import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

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

const BASE_PATH = '/api/v1/hotel-booking';

export const hotelBookingService = {
  async create<TResponse = unknown>(body: CreateHotelBookingBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/create`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findAll<TResponse = unknown>(token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/list`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findOne<TResponse = unknown>(id: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async update<TResponse = unknown>(id: string, body: UpdateHotelBookingBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(`${BASE_PATH}/update/${id}`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async confirm<TResponse = unknown>(bookingCode: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(
        `${BASE_PATH}/confirm/${bookingCode}`,
        undefined,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async checkIn<TResponse = unknown>(bookingCode: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(
        `${BASE_PATH}/check-in/${bookingCode}`,
        undefined,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async checkOut<TResponse = unknown>(bookingCode: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(
        `${BASE_PATH}/check-out/${bookingCode}`,
        undefined,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async refundCancel<TResponse = unknown>(body: RefundBookingBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(`${BASE_PATH}/refund-cancel`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async cancel<TResponse = unknown>(id: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.delete<TResponse, TResponse>(`${BASE_PATH}/cancel/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },
};
