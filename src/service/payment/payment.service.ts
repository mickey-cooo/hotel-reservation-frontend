import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

export interface PaymentResponse {
  id: string;
  cardHolderName: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  status: string;
}

export interface CreatePaymentBodyDto {
  cardNumber: string;
  cardHolderName: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
}

export interface UpdatePaymentBodyDto {
  user_id?: string;
  cardNumber?: string;
  cardHolderName?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  cardCvv?: string;
}

export interface FindAllPaymentQuery {
  user_id?: string;
}

const BASE_PATH = '/api/v1/payment';

export const paymentService = {
  async create(body: CreatePaymentBodyDto, token?: string): Promise<PaymentResponse> {
    try {
      return await requestClient.post<PaymentResponse, PaymentResponse>(
        `${BASE_PATH}/create`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findAll(query?: FindAllPaymentQuery, token?: string): Promise<PaymentResponse[]> {
    try {
      return await requestClient.get<PaymentResponse[], PaymentResponse[]>(`${BASE_PATH}/list`, {
        ...authHeader(token),
        params: query,
      });
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async findOne(id: string, token?: string): Promise<PaymentResponse> {
    try {
      return await requestClient.get<PaymentResponse, PaymentResponse>(`${BASE_PATH}/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async update(id: string, body: UpdatePaymentBodyDto, token?: string): Promise<PaymentResponse> {
    try {
      return await requestClient.patch<PaymentResponse, PaymentResponse>(
        `${BASE_PATH}/update/${id}`,
        body,
        authHeader(token),
      );
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },

  async delete(id: string, token?: string): Promise<PaymentResponse> {
    try {
      return await requestClient.delete<PaymentResponse, PaymentResponse>(`${BASE_PATH}/delete/${id}`, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },
};
