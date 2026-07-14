'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { NEXT_LOCALE_COOKIE_NAME, SUPPORTED_LOCALES } from '@/lib/locale-cookie';
import styles from './LanguageSwitcher.module.scss';

const LANGUAGE_LABELS: Record<(typeof SUPPORTED_LOCALES)[number], string> = {
  en: 'EN',
  th: 'TH',
};

function setLocaleCookie(code: string): void {
  document.cookie = `${NEXT_LOCALE_COOKIE_NAME}=${code}; path=/`;
}

interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
  fullWidth?: boolean;
}

export default function LanguageSwitcher({
  variant = 'dark',
  fullWidth = false,
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const isLight = variant === 'light';

  const handleSelect = (code: string) => {
    if (code === i18n.language) return;
    setLocaleCookie(code);
    i18n.changeLanguage(code);
    router.refresh();
  };

  return (
    <div
      className={`${styles.switcher}${isLight ? ` ${styles.switcherLight}` : ''}${fullWidth ? ` ${styles.switcherFullWidth}` : ''}`}
    >
      {SUPPORTED_LOCALES.map((code) => {
        const isActive = i18n.language === code;
        return (
          <Button
            key={code}
            onClick={() => handleSelect(code)}
            className={`${styles.langBtn}${isActive ? ` ${styles.langBtnActive}` : ''}`}
            aria-pressed={isActive}
          >
            {LANGUAGE_LABELS[code]}
          </Button>
        );
      })}
    </div>
  );
}
