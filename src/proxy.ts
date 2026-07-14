import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/service/auth-cookie';
import {
  NEXT_LOCALE_COOKIE_NAME,
  DEFAULT_LOCALE,
  isSupportedLocale,
} from '@/lib/locale-cookie';

const PROTECTED_PATHS = ['/bookings', '/checkout'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  const res = (() => {
    if (!isProtected) return NextResponse.next();

    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  })();

  const rawLocale = req.cookies.get(NEXT_LOCALE_COOKIE_NAME)?.value;
  if (!rawLocale || !isSupportedLocale(rawLocale)) {
    res.cookies.set(NEXT_LOCALE_COOKIE_NAME, DEFAULT_LOCALE, { path: '/' });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
