import { AxiosError } from 'axios';

export const AUTH_COOKIE_NAME = 'lumina_access_token';
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function extractErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data;
    if (typeof data === 'object' && data !== null && 'message' in data) {
      return (data as { message: string }).message;
    }
  }
  return fallback;
}
