import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

export interface CreatePaymentLogBodyDto {
  action: string;
  log: string;
  transactionId: string;
  hotelId: string;
  hotelRoomId: string;
  hotelBookingId: string;
  userId: string;
}

export interface UpdatePaymentLogBodyDto {
  action: string;
  log: string;
  transactionId: string;
  hotelId: string;
  hotelRoomId: string;
  hotelBookingId: string;
  userId: string;
}

const BASE_PATH = '/api/v1/payment-log';

export const paymentLogService = {
  async create<TResponse = unknown>(body: CreatePaymentLogBodyDto, token?: string): Promise<TResponse> {
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

  async update<TResponse = unknown>(id: string, body: UpdatePaymentLogBodyDto, token?: string): Promise<TResponse> {
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
