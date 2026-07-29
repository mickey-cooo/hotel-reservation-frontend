// API response shape
export interface PaymentResponse {
  id: string;
  cardHolderName: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  status: string;
}

// Service DTOs
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
