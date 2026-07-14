'use server';

import { cookies } from 'next/headers';
import {
  userService,
  type LoginBodyDto,
  type RegisterBodyDto,
  type VerifyOtpBodyDto,
} from '@/service/user/user.service';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE_SECONDS,
  extractErrorMessage,
} from '@/service/auth-cookie';

export interface AuthActionResult {
  ok: boolean;
  message?: string;
}

export async function loginAction(body: LoginBodyDto): Promise<AuthActionResult> {
  try {
    const res = await userService.login<{ accessToken: string }>(body);
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, message: extractErrorMessage(err, 'Login failed') };
  }
}

export async function registerAction(body: RegisterBodyDto): Promise<AuthActionResult> {
  try {
    await userService.register(body);
    return { ok: true };
  } catch (err) {
    return { ok: false, message: extractErrorMessage(err, 'Register failed') };
  }
}

export async function verifyOtpAction(body: VerifyOtpBodyDto): Promise<AuthActionResult> {
  try {
    await userService.verifyOtp(body);
    return { ok: true };
  } catch (err) {
    return { ok: false, message: extractErrorMessage(err, 'OTP verification failed') };
  }
}

export async function logoutAction(): Promise<AuthActionResult> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return { ok: true };
}
