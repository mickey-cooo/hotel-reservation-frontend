import { getServerLocale } from '@/lib/server-locale';

export const languageManager = {
  async getLang(): Promise<string> {
    return getServerLocale();
  },
};
