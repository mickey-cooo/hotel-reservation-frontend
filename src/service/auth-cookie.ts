import { AxiosError } from 'axios';

export const AUTH_COOKIE_NAME = 'lumina_access_token';
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// Non-httpOnly companion cookie so client components (e.g. Navbar) can tell
// whether a user is logged in without being able to read the JWT itself.
export const USER_EMAIL_COOKIE_NAME = 'lumina_user_email';

export function extractErrorMessage(err: unknown, fallback: string): string {
  // Service methods catch AxiosError and rethrow `error.response` (an
  // AxiosResponse) or `error.message`, so `err` is rarely an AxiosError here.
  const data =
    err instanceof AxiosError
      ? err.response?.data
      : (err as { data?: unknown } | null | undefined)?.data;

  if (typeof data === 'object' && data !== null && 'message' in data) {
    const message = (data as { message: unknown }).message;
    if (typeof message === 'string') return message;
  }
  return fallback;
}
