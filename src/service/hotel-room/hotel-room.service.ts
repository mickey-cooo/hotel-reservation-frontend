import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

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

const BASE_PATH = '/api/v1/hotel-room';

export const hotelRoomService = {
  async create<TResponse = unknown>(body: CreateManyHotelRoomBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/create`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findAll<TResponse = unknown>(query?: FindAllHotelRoomQuery, token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/list`, {
        ...authHeader(token),
        params: query,
      });
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

  async update<TResponse = unknown>(id: string, body: UpdateHotelRoomBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(`${BASE_PATH}/update/${id}`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async delete<TResponse = unknown>(id: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.delete<TResponse, TResponse>(`${BASE_PATH}/delete/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async checkAvailability<TResponse = unknown>(id: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/availability/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },
};
