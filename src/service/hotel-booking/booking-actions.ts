'use server';

import { revalidatePath } from 'next/cache';
import {
  hotelBookingService,
  type CreateHotelBookingBodyDto,
} from '@/service/hotel-booking/hotel-booking.service';
import { getServerAuthToken } from '@/service/server-auth';
import { extractErrorMessage } from '@/service/auth-cookie';

export interface CreateBookingActionResult {
  ok: boolean;
  message?: string;
  bookingCode?: string;
}

export async function createBookingAction(
  body: CreateHotelBookingBodyDto,
): Promise<CreateBookingActionResult> {
  const token = await getServerAuthToken();
  if (!token) {
    return { ok: false, message: 'Unauthorized' };
  }

  try {
    const res = await hotelBookingService.create<Record<string, unknown>>(body, token);
    const bookingCode = (res.bookingCode ?? res.booking_code) as string;
    revalidatePath('/bookings');
    return { ok: true, bookingCode };
  } catch (err) {
    return { ok: false, message: extractErrorMessage(err, 'Booking failed') };
  }
}
