export const NEXT_LOCALE_COOKIE_NAME = 'lang';
export const DEFAULT_LOCALE = 'th';
export const SUPPORTED_LOCALES = ['en', 'th'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
