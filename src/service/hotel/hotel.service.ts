import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

export type {
  AddressDto,
  UpdateHotelRoomInHotelDto,
  CreateHotelBodyDto,
  UpdateHotelBodyDto,
  FindAllHotelQuery,
} from '@/models/entity/hotel/hotel.model';
import type {
  CreateHotelBodyDto,
  UpdateHotelBodyDto,
  FindAllHotelQuery,
} from '@/models/entity/hotel/hotel.model';

const BASE_PATH = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/hotel`;

export const hotelService = {
  async create<TResponse = unknown>(
    body: CreateHotelBodyDto,
    token?: string,
  ): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(
        `${BASE_PATH}/create`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError
        ? error.response || error.message
        : error;
    }
  },

  async findAll<TResponse = unknown>(
    query?: FindAllHotelQuery,
  ): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(
        `${BASE_PATH}/list`,
        {
          params: query,
        },
      );
    } catch (error) {
      throw error;
    }
  },

  async findOne<TResponse = unknown>(
    id: string,
    token?: string,
  ): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(
        `${BASE_PATH}/${id}`,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError
        ? error.response || error.message
        : error;
    }
  },

  async update<TResponse = unknown>(
    id: string,
    body: UpdateHotelBodyDto,
    token?: string,
  ): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(
        `${BASE_PATH}/update/${id}`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError
        ? error.response || error.message
        : error;
    }
  },

  async delete<TResponse = unknown>(
    id: string,
    token?: string,
  ): Promise<TResponse> {
    try {
      return await requestClient.delete<TResponse, TResponse>(
        `${BASE_PATH}/delete/${id}`,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError
        ? error.response || error.message
        : error;
    }
  },
};
