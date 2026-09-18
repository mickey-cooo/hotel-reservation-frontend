'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { USER_EMAIL_COOKIE_NAME } from '@/service/auth-cookie';

function readUserEmailCookie(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${USER_EMAIL_COOKIE_NAME}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function useUserEmail(): string | null {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- document.cookie is only readable client-side, so login state can't be known during the initial render
    setUserEmail(readUserEmailCookie());
  }, [pathname]);

  return userEmail;
}
