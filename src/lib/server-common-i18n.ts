import enCommon from '../../public/static/lang/en/common.json';
import thCommon from '../../public/static/lang/th/common.json';
import type { SupportedLocale } from './locale-cookie';

type CommonTranslations = typeof enCommon;

function getNestedValue(source: CommonTranslations, path: string): string {
  const value = path.split('.').reduce<unknown>((current, key) => {
    if (typeof current !== 'object' || current === null) return undefined;
    return (current as Record<string, unknown>)[key];
  }, source);

  return typeof value === 'string' ? value : path;
}

export function getCommonTranslation(
  locale: SupportedLocale,
  key: string,
  variables: Record<string, string> = {},
): string {
  const translations = locale === 'th' ? thCommon : enCommon;
  return getNestedValue(translations, key).replace(/{{(\w+)}}/g, (_, name: string) => {
    return variables[name] ?? `{{${name}}}`;
  });
}
