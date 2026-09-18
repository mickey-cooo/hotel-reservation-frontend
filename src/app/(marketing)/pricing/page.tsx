'use client';

import { useTranslation } from 'react-i18next';

export default function PricingPage() {
  const { t } = useTranslation('common');
  return <div>{t('pages.pricing')}</div>;
}
