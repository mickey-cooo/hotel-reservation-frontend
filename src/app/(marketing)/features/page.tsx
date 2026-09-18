'use client';

import { useTranslation } from 'react-i18next';

export default function FeaturesPage() {
  const { t } = useTranslation('common');
  return <div>{t('pages.features')}</div>;
}
