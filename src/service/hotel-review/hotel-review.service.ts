import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

export interface CreateHotelReviewBodyDto {
  hotel_id: string;
  title: string;
  description: string;
  rating: number;
  isAnonymous: boolean;
  isReply: boolean;
}

export interface UpdateHotelReviewBodyDto {
  hotel_id: string;
  title: string;
  description: string;
  rating: number;
  isAnonymous: boolean;
}

export interface ReplyHotelReviewBodyDto {
  hotel_id: string;
  review_id: string;
  reply: string;
  isReply: boolean;
}

export interface FindAllHotelReviewQuery {
  hotel_id: string;
}

const BASE_PATH = '/api/v1/hotel-review';

export const hotelReviewService = {
  async create<TResponse = unknown>(body: CreateHotelReviewBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/create`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async reply<TResponse = unknown>(body: ReplyHotelReviewBodyDto, token?: string): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/reply`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  // backend reads this GET's filter from the request body, not query params
  async findAll<TResponse = unknown>(query: FindAllHotelReviewQuery, token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/list`, {
        ...authHeader(token),
        data: query,
      });
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findOne<TResponse = unknown>(id: string, hotelId: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.get<TResponse, TResponse>(`${BASE_PATH}/${id}/hotel/${hotelId}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async update<TResponse = unknown>(
    id: string,
    hotelId: string,
    body: UpdateHotelReviewBodyDto,
    token?: string,
  ): Promise<TResponse> {
    try {
      return await requestClient.patch<TResponse, TResponse>(
        `${BASE_PATH}/${id}/hotel/${hotelId}`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async delete<TResponse = unknown>(id: string, hotelId: string, token?: string): Promise<TResponse> {
    try {
      return await requestClient.delete<TResponse, TResponse>(
        `${BASE_PATH}/${id}/hotel/${hotelId}`,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },
};
