import { AxiosError } from 'axios';
import { requestClient, authHeader } from '../request';

export interface CreateCheckoutSessionDto {
  orderId: string;
  bookingCode: string;
  amount: number;
  currency: string;
  productName: string;
  successUrl: string;
  cancelUrl: string;
}

const BASE_PATH = '/api/v1/stripe';

export const stripeService = {
  async createCheckoutSession<TResponse = unknown>(
    body: CreateCheckoutSessionDto,
    token?: string,
  ): Promise<TResponse> {
    try {
      return await requestClient.post<TResponse, TResponse>(`${BASE_PATH}/checkout`, body, authHeader(token));
    } catch (error) {
      throw error instanceof AxiosError ? error.response || error.message : error;
    }
  },
};
