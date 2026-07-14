import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

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

export interface FindAllHotelQuery {
  page?: number;
  limit?: number;
  ids?: string[];
}

const BASE_PATH = '/api/v1/hotel';

export const hotelService = {
  async create<TResponse = unknown>(body: CreateHotelBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/create`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findAll<TResponse = unknown>(query?: FindAllHotelQuery, token?: string): Promise<TResponse> {
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

  async update<TResponse = unknown>(id: string, body: UpdateHotelBodyDto, token?: string): Promise<TResponse> {
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
};
