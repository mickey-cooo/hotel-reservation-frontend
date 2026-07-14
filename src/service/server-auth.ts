import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from './auth-cookie';

export async function getServerAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}
