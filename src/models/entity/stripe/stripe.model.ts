// Service DTOs
export interface CreateCheckoutSessionDto {
  orderId: string;
  bookingCode: string;
  amount: number;
  currency: string;
  productName: string;
  successUrl: string;
  cancelUrl: string;
}
