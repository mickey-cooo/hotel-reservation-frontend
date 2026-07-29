// API entity (raw backend shape)
export interface ApiHotelReview {
  id: string;
  title: string;
  description: string;
  rating: number;
  isAnonymous: boolean;
  isReply: boolean;
  createdBy: string;
  createdAt: string;
}

// UI type
export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  helpfulCount?: number;
  photos?: string[];
}

// Service DTOs
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
