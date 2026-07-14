import { cookies } from 'next/headers';
import {
  NEXT_LOCALE_COOKIE_NAME,
  DEFAULT_LOCALE,
  isSupportedLocale,
  type SupportedLocale,
} from './locale-cookie';

export async function getServerLocale(): Promise<SupportedLocale> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(NEXT_LOCALE_COOKIE_NAME)?.value;
  return rawLocale && isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
}
